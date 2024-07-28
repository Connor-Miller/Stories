using Neo4j.Driver;
using Stories.Server.Models;
using Stories.Server.Models.Requests;

namespace Stories.Server.Repositories;

public interface IPersonRepository
{
    Task<Person> GetPersonById(Guid personId);
    Task<Person> CreatePerson(Person person);
}

public class PersonRepository : IPersonRepository
{
    private readonly IDriver _driver;
    private readonly QueryConfig _queryConfig;
    private readonly NodeService<Person> personNodeService;

    public PersonRepository(IDriver driver)
    {
        var versionStr = Environment.GetEnvironmentVariable("NEO4J_VERSION") ?? "";
        if (double.TryParse(versionStr, out var version) && version >= 4.0)
        {
            _queryConfig = new QueryConfig(database: "neo4j");
        }
        else
        { 
            _queryConfig = new QueryConfig();
        }

        _driver = driver;
        personNodeService = new NodeService<Person>();
    }

    public async Task<Person> GetPersonById(Guid personId)
    {
        using var session = _driver.AsyncSession();
        try
        {
            var result = await session.RunAsync(
                "MATCH (p:Person {PersonId: $PersonId}) RETURN p",
                new { PersonId = personId }
            );

            var record = await result.SingleAsync();

            var personNode = record["p"].As<INode>();
            var person = new Person(
                personNode.Properties["PersonId"].As<Guid>(),
                personNode.Properties["Name"].As<string>(),
                DateTime.Parse(personNode.Properties["Birthday"].As<string>()),
                personNode.Properties["BirthLocation"].As<string>()
            );

            return person;
        }
        catch (Exception ex)
        {
            // Handle the case when the story is not found or any other error occurs
            Console.WriteLine($"An error occurred: {ex.Message}");
            return null;
        }
        finally
        {
            await session.CloseAsync();
        }
    }

    public async Task<Person> CreatePerson(Person person)
    {
        using var session = _driver.AsyncSession();
        try
        {
            var result = await session.ExecuteWriteAsync(async tx =>
            {

                var personProperties = personNodeService.ToProperties(person);
                var result = await tx.RunAsync(
                    "CREATE (p:Person) SET p = $props RETURN p",
                    new { props = personProperties }
                );

                var record = await result.SingleAsync(record => record["p"].As<INode>());
                if (record == null)
                {
                    throw new Exception("No person node was created");
                }

                Person newPerson = personNodeService.FromNode(record);
                return person;

            });

            return result;
        }
        catch (Exception ex)
        {
            // Handle the case when person creation fails or any other error occurs
            Console.WriteLine($"An error occurred while creating person: {ex.Message}");
            return null;
        }
        finally
        {
            await session.CloseAsync();
        }
    }

}
