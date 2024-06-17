using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using Neo4j.Driver;
using Stories.Server.Models;

namespace Stories.Server.Repositories;

public interface IFamilyRepository
{
    //Task<Movie> FindByTitle(string title);
    //Task<int> VoteByTitle(string title);
    //Task<List<Movie>> Search(string search);
    //Task<D3Graph> FetchD3Graph(int limit);
    Task PopulateFamilyTreeData();
    Task<FamilyTree> GetFamilyTree();
    Task DeleteAllFamilyTreeData();
    Task<List<Person>> GetAncestors(int personID);
    Task<List<Person>> GetDescendants(int personID);
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
            //_queryConfig = new QueryConfig(database: Environment.GetEnvironmentVariable("NEO4J_DATABASE") ?? "movies");
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
        var persons = new List<Person>
    {
        // Generation 1
        new Person(1, "Great Grandpa", new DateTime(1930, 1, 1)),
        new Person(2, "Great Grandma", new DateTime(1932, 2, 2)),

        // Generation 2
        new Person(3, "Grandpa", new DateTime(1955, 3, 3)),
        new Person(4, "Grandma", new DateTime(1957, 4, 4)),
        new Person(5, "Great Uncle", new DateTime(1958, 5, 5)),
        new Person(6, "Great Aunt", new DateTime(1960, 6, 6)),

        // Generation 3
        new Person(7, "Father", new DateTime(1980, 7, 7)),
        new Person(8, "Mother", new DateTime(1982, 8, 8)),
        new Person(9, "Uncle", new DateTime(1983, 9, 9)),
        new Person(10, "Aunt", new DateTime(1985, 10, 10)),

        // Generation 4
        new Person(11, "Child1", new DateTime(2005, 11, 11)),
        new Person(12, "Child2", new DateTime(2007, 12, 12)),
        new Person(13, "Cousin1", new DateTime(2008, 1, 13)),
        new Person(14, "Cousin2", new DateTime(2010, 2, 14))
    };

        // Relationships: mother, father, and spouse
        var relationships = new List<(int From, int To, string Type)>
    {
        // Spouse relationships
        (1, 2, "SPOUSE"),
        (3, 4, "SPOUSE"),
        (7, 8, "SPOUSE"),
        (9, 10, "SPOUSE"),

        // Parent-child relationships
        (3, 1, "FATHER"),
        (3, 2, "MOTHER"),
        (5, 1, "FATHER"),
        (5, 2, "MOTHER"),
        (7, 3, "FATHER"),
        (7, 4, "MOTHER"),
        (9, 3, "FATHER"),
        (9, 4, "MOTHER"),
        (11, 7, "FATHER"),
        (11, 8, "MOTHER"),
        (12, 7, "FATHER"),
        (12, 8, "MOTHER"),
        (13, 9, "FATHER"),
        (13, 10, "MOTHER"),
        (14, 9, "FATHER"),
        (14, 10, "MOTHER")
    };

        using var session = _driver.AsyncSession();

        try
        {
            // Create person nodes
            foreach (var person in persons)
            {
                await session.RunAsync(
                    "CREATE (p:Person {PersonID: $PersonID, Name: $Name, Birthday: $Birthday})",
                    new { person.PersonID, person.Name, Birthday = person.Birthday.ToString("yyyy-MM-dd") }
                );
            }

            // Create relationships
            foreach (var relationship in relationships)
            {
                await session.RunAsync(
                    $@"
                MATCH (a:Person {{PersonID: $From}})
                MATCH (b:Person {{PersonID: $To}})
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

            var personsDict = new Dictionary<int, Person>();

            foreach (var record in records)
            {
                var personNode = record["p"].As<INode>();
                var person = new Person(
                    personNode.Properties["PersonID"].As<int>(),
                    personNode.Properties["Name"].As<string>(),
                    DateTime.Parse(personNode.Properties["Birthday"].As<string>())
                );

                if (!personsDict.ContainsKey(person.PersonID))
                {
                    personsDict.Add(person.PersonID, person);
                    familyTree.Persons.Add(person);
                }

                if (record["relatedPerson"] != null)
                {
                    var relatedPersonNode = record["relatedPerson"].As<INode>();
                    var relatedPerson = new Person(
                        relatedPersonNode.Properties["PersonID"].As<int>(),
                        relatedPersonNode.Properties["Name"].As<string>(),
                        DateTime.Parse(relatedPersonNode.Properties["Birthday"].As<string>())
                    );

                    if (!personsDict.ContainsKey(relatedPerson.PersonID))
                    {
                        personsDict.Add(relatedPerson.PersonID, relatedPerson);
                        familyTree.Persons.Add(relatedPerson);
                    }

                    var relationship = new Relationship
                    {
                        From = person.PersonID,
                        To = relatedPerson.PersonID,
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
    public async Task<List<Person>> GetAncestors(int personID)
    {
        var ancestors = new List<Person>();

        using var session = _driver.AsyncSession();
        try
        {
            var query = @"
            MATCH (person:Person {PersonID: $personID})
            OPTIONAL MATCH (person)-[:FATHER|MOTHER*]->(ancestor:Person)
            RETURN DISTINCT ancestor";

            var result = await session.RunAsync(query, new { personID });

            var records = await result.ToListAsync();

            foreach (var record in records)
            {
                if (record["ancestor"] == null) continue;

                var ancestorNode = record["ancestor"].As<INode>();
                var ancestor = new Person(
                    ancestorNode.Properties["PersonID"].As<int>(),
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
    public async Task<List<Person>> GetDescendants(int personID)
    {
        var descendants = new List<Person>();

        using var session = _driver.AsyncSession();
        try
        {
            var query = @"
            MATCH (person:Person {PersonID: $personID})
            OPTIONAL MATCH (person)<-[:FATHER|MOTHER*]-(descendant:Person)
            RETURN DISTINCT descendant";

            var result = await session.RunAsync(query, new { personID });

            var records = await result.ToListAsync();

            foreach (var record in records)
            {
                if (record["descendant"] == null) continue;

                var descendantNode = record["descendant"].As<INode>();
                var descendant = new Person(
                    descendantNode.Properties["PersonID"].As<int>(),
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
                "CREATE (p:Person {PersonID: $PersonID, Name: $Name, Birthday: $Birthday})",
                new { person.PersonID, person.Name, Birthday = person.Birthday.ToString("yyyy-MM-dd") }
            );

            // Create relationships
            foreach (var relationship in relationships)
            {
                await session.RunAsync(
                    $@"
                MATCH (a:Person {{PersonID: $PersonID}})
                MATCH (b:Person {{PersonID: $RelatedPersonID}})
                CREATE (a)-[:{relationship.Type}]->(b)",
                    new { PersonID = person.PersonID, RelatedPersonID = relationship.To }
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
