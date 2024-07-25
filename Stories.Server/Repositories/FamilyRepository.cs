using Neo4j.Driver;
using Stories.Server.Models;

namespace Stories.Server.Repositories;

public interface IFamilyRepository
{
    Task PopulateFamilyTreeData();
    Task<FamilyTree> GetFamilyTree();
    Task DeleteAllFamilyTreeData();
    Task<List<Person>> GetAncestors(int personId);
    Task<List<Person>> GetDescendants(int personId);
    Task AddPersonWithRelationships(Person person, List<Relationship> relationships);

}

public class FamilyRepository : IFamilyRepository
{
    private readonly IDriver _driver;
    private readonly QueryConfig _queryConfig;

    public FamilyRepository(IDriver driver)
    {
        var versionStr = Environment.GetEnvironmentVariable("NEO4J_VERSION") ?? "";
        if( double.TryParse(versionStr, out var version) && version >= 4.0)
        {
            _queryConfig = new QueryConfig(database: "neo4j");
        }
        else
        {
            _queryConfig = new QueryConfig();
        }

        _driver = driver;
    }

    public async Task PopulateFamilyTreeData()
    {
        
        Guid guid1 = Guid.NewGuid();
        Guid guid2 = Guid.NewGuid();
        Guid guid3 = Guid.NewGuid();
        Guid guid4 = Guid.NewGuid();
        Guid guid5 = Guid.NewGuid();
        Guid guid6 = Guid.NewGuid();
        Guid guid7 = Guid.NewGuid();
        Guid guid8 = Guid.NewGuid();
        Guid guid9 = Guid.NewGuid();
        Guid guid10 = Guid.NewGuid();
        Guid guid11 = Guid.NewGuid();
        Guid guid12 = Guid.NewGuid();
        Guid guid13 = Guid.NewGuid();
        Guid guid14 = Guid.NewGuid();
        Guid guid15 = Guid.NewGuid();


        var persons = new List<Person>
    {
        // Generation 1
        new Person(guid1, "Great Grandpa", new DateTime(1930, 1, 1)),
        new Person(guid2, "Great Grandma", new DateTime(1932, 2, 2)),

        // Generation 2
        new Person(guid3, "Grandpa", new DateTime(1955, 3, 3)),
        new Person(guid4, "Grandma", new DateTime(1957, 4, 4)),
        new Person(guid5, "Great Uncle", new DateTime(1958, 5, 5)),
        new Person(guid6, "Great Aunt", new DateTime(1960, 6, 6)),

        // Generation 3
        new Person(guid7, "Father", new DateTime(1980, 7, 7)),
        new Person(guid8, "Mother", new DateTime(1982, 8, 8)),
        new Person(guid9, "Uncle", new DateTime(1983, 9, 9)),
        new Person(guid10, "Aunt", new DateTime(1985, 10, 10)),

        // Generation 4
        new Person(guid11, "Child1", new DateTime(2005, 11, 11)),
        new Person(guid12, "Child2", new DateTime(2007, 12, 12)),
        new Person(guid13, "Cousin1", new DateTime(2008, 1, 13)),
        new Person(guid14, "Cousin2", new DateTime(2010, 2, 14))
    };

        // Relationships: mother, father, and spouse
        var relationships = new List<(Guid From, Guid To, string Type)>
    {
        // Spouse relationships
        (guid1, guid2, "SPOUSE"),
        (guid3, guid4, "SPOUSE"),
        (guid5, guid6, "SPOUSE"),
        (guid7, guid8, "SPOUSE"),
        (guid9, guid10, "SPOUSE"),

        // Parent-child relationships
        (guid3, guid1, "FATHER"),
        (guid3, guid2, "MOTHER"),
        (guid5, guid1, "FATHER"),
        (guid5, guid2, "MOTHER"),
        (guid7, guid3, "FATHER"),
        (guid7, guid4, "MOTHER"),
        (guid9, guid3, "FATHER"),
        (guid9, guid4, "MOTHER"),
        (guid11, guid7, "FATHER"),
        (guid11, guid8, "MOTHER"),
        (guid12, guid7, "FATHER"),
        (guid12, guid8, "MOTHER"),
        (guid13, guid9, "FATHER"),
        (guid13, guid10, "MOTHER"),
        (guid14, guid9, "FATHER"),
        (guid14, guid10, "MOTHER")
    };

        using var session = _driver.AsyncSession();

        try
        {
            // Create person nodes
            foreach (var person in persons)
            {
                await session.RunAsync(
                    "CREATE (p:Person {PersonId: $PersonId, Name: $Name, Birthday: $Birthday})",
                    new { person.PersonId, person.DisplayName, Birthday = person.Birthday.ToString("yyyy-MM-dd") }
                );
            }

            // Create relationships
            foreach (var relationship in relationships)
            {
                await session.RunAsync(
                    $@"
                MATCH (a:Person {{PersonId: $From}})
                MATCH (b:Person {{PersonId: $To}})
                CREATE (a)-[:{relationship.Type}]->(b)",
                    new { From = relationship.From, To = relationship.To }
                );
            }
        }
        finally
        {
            await session.CloseAsync();
        }
    }
    public async Task DeleteAllFamilyTreeData()
    {
        using var session = _driver.AsyncSession();
        try
        {
            await session.RunAsync("MATCH (p:Person) DETACH DELETE p");
        }
        finally
        {
            await session.CloseAsync();
        }
    }
    public async Task<FamilyTree> GetFamilyTree()
    {
        var familyTree = new FamilyTree();

        using var session = _driver.AsyncSession();
        try
        {
            var query = @"
            MATCH (p:Person)
            OPTIONAL MATCH (p)-[r]->(relatedPerson:Person)
            RETURN p, relatedPerson, type(r) AS relationshipType";

            var result = await session.RunAsync(query);

            var records = await result.ToListAsync();

            var personsDict = new Dictionary<Guid, Person>();

            foreach (var record in records)
            {
                var personNode = record["p"].As<INode>();
                var person = new Person(
                    personNode.Properties["PersonId"].As<Guid>(),
                    personNode.Properties["Name"].As<string>(),
                    DateTime.Parse(personNode.Properties["Birthday"].As<string>())
                );

                if (!personsDict.ContainsKey(person.PersonId))
                {
                    personsDict.Add(person.PersonId, person);
                    familyTree.Persons.Add(person);
                }

                if (record["relatedPerson"] != null)
                {
                    var relatedPersonNode = record["relatedPerson"].As<INode>();
                    var relatedPerson = new Person(
                        relatedPersonNode.Properties["PersonId"].As<Guid>(),
                        relatedPersonNode.Properties["Name"].As<string>(),
                        DateTime.Parse(relatedPersonNode.Properties["Birthday"].As<string>())
                    );

                    if (!personsDict.ContainsKey(relatedPerson.PersonId))
                    {
                        personsDict.Add(relatedPerson.PersonId, relatedPerson);
                        familyTree.Persons.Add(relatedPerson);
                    }

                    var relationship = new Relationship
                    {
                        From = person.PersonId,
                        To = relatedPerson.PersonId,
                        Type = record["relationshipType"].As<string>()
                    };

                    familyTree.Relationships.Add(relationship);
                }
            }
        }
        finally
        {
            await session.CloseAsync();
        }

        return familyTree;
    }
    public async Task<List<Person>> GetAncestors(int personId)
    {
        var ancestors = new List<Person>();

        using var session = _driver.AsyncSession();
        try
        {
            var query = @"
            MATCH (person:Person {PersonId: $personId})
            OPTIONAL MATCH (person)-[:FATHER|MOTHER*]->(ancestor:Person)
            RETURN DISTINCT ancestor";

            var result = await session.RunAsync(query, new { personId });

            var records = await result.ToListAsync();

            foreach (var record in records)
            {
                if (record["ancestor"] == null) continue;

                var ancestorNode = record["ancestor"].As<INode>();
                var ancestor = new Person(
                    ancestorNode.Properties["PersonId"].As<Guid>(),
                    ancestorNode.Properties["Name"].As<string>(),
                    DateTime.Parse(ancestorNode.Properties["Birthday"].As<string>())
                );

                ancestors.Add(ancestor);
            }
        }
        finally
        {
            await session.CloseAsync();
        }

        return ancestors;
    }
    public async Task<List<Person>> GetDescendants(int personId)
    {
        var descendants = new List<Person>();

        using var session = _driver.AsyncSession();
        try
        {
            var query = @"
            MATCH (person:Person {PersonId: $personId})
            OPTIONAL MATCH (person)<-[:FATHER|MOTHER*]-(descendant:Person)
            RETURN DISTINCT descendant";

            var result = await session.RunAsync(query, new { personId });

            var records = await result.ToListAsync();

            foreach (var record in records)
            {
                if (record["descendant"] == null) continue;

                var descendantNode = record["descendant"].As<INode>();
                var descendant = new Person(
                    descendantNode.Properties["PersonId"].As<Guid>(),
                    descendantNode.Properties["Name"].As<string>(),
                    DateTime.Parse(descendantNode.Properties["Birthday"].As<string>())
                );

                descendants.Add(descendant);
            }
        }
        finally
        {
            await session.CloseAsync();
        }

        return descendants;
    }
    public async Task AddPersonWithRelationships(Person person, List<Relationship> relationships)
    {
        using var session = _driver.AsyncSession();
        try
        {
            // Create the person node
            await session.RunAsync(
                "CREATE (p:Person {PersonId: $PersonId, Name: $Name, Birthday: $Birthday})",
                new { person.PersonId, person.DisplayName, Birthday = person.Birthday.ToString("yyyy-MM-dd") }
            );

            // Create relationships
            foreach (var relationship in relationships)
            {
                await session.RunAsync(
                    $@"
                MATCH (a:Person {{PersonId: $PersonId}})
                MATCH (b:Person {{PersonId: $RelatedPersonId}})
                CREATE (a)-[:{relationship.Type}]->(b)",
                    new { PersonId = person.PersonId, RelatedPersonId = relationship.To }
                );
            }
        }
        finally
        {
            await session.CloseAsync();
        }
    }




    //public async Task<D3Graph> FetchD3Graph(int limit)
    //{
    //    var (queryResults, _) = await _driver
    //        .ExecutableQuery(@"
    //            MATCH (m:Movie)<-[:ACTED_IN]-(p:Person)
    //            WITH m, p
    //            ORDER BY m.title, p.name
    //            RETURN m.title AS title, collect(p.name) AS cast
    //            LIMIT $limit")
    //        .WithParameters(new { limit })
    //        .WithConfig(_queryConfig)
    //        .ExecuteAsync();

    //    var nodes = new List<D3Node>();
    //    var links = new List<D3Link>();

    //    foreach (var record in queryResults)
    //    {
    //        var movie = new D3Node(record["title"].As<string>(), "movie");
    //        var movieIndex = nodes.Count;
    //        nodes.Add(movie);
    //        foreach (var actorName in record["cast"].As<IList<string>>())
    //        {
    //            var actor = new D3Node(actorName, "actor");
    //            var actorIndex = nodes.IndexOf(actor);
    //            actorIndex = actorIndex == -1 ? nodes.Count : actorIndex;
    //            nodes.Add(actor);
    //            links.Add(new D3Link(actorIndex, movieIndex));
    //        }
    //    }

    //    return new D3Graph(nodes, links);
    //}

    //private static IEnumerable<Person> MapCast(IEnumerable<IDictionary<string, object>> persons)
    //{
    //    return persons
    //        .Select(
    //            dictionary =>
    //                new Person(
    //                    dictionary["name"].As<string>(),
    //                    dictionary["job"].As<string>(),
    //                    dictionary["role"].As<string>()))
    //        .ToList();
    //}
}
