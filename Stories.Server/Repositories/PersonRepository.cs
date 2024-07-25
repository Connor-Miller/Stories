using Neo4j.Driver;
using Stories.Server.Models;

namespace Stories.Server.Repositories;

public interface IPersonRepository
{

    Task<Person> GetPersonById(int personID);
}

public class PersonRepository : IPersonRepository
{
    private readonly IDriver _driver;
    private readonly QueryConfig _queryConfig;

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
    }

    public async Task<Person> GetPersonById(int personId)
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



}
