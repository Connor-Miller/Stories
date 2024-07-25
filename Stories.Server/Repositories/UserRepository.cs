using Neo4j.Driver;
using Stories.Server.Models;
using Stories.Server.Models.Requests;

namespace Stories.Server.Repositories;

public interface IUserRepository
{

    Task<User> GetUserByEmail(string email);
    Task<User> CreateUser(CreateUserRequest request);
    Task<bool> CheckUserAccess(Guid userId, Guid recordId);
    Task AddUserFollowRelationship(Guid userId, Guid personId);
}

public class UserRepository : IUserRepository
{
    private readonly IDriver _driver;
    private readonly QueryConfig _queryConfig;

    public UserRepository(IDriver driver)
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

    public async Task<User> GetUserByEmail(string email)
    {
        var userNodeService = new NodeService<User>();

        using var session = _driver.AsyncSession();
        try 
        {
            var result = await session.RunAsync(
                "MATCH (u:User {Email: $Email}) RETURN u",
                new { Email = email }
            );

            var record = await result.SingleAsync();

            var userNode = record["u"].As<INode>();
            User user = userNodeService.FromNode(userNode);

            return user;
        }
        catch (Exception ex)
        {
            // Handle the case when the user is not found or any other error occurs
            Console.WriteLine($"An error occurred: {ex.Message}");
            return null;
        }
        finally
        {
            await session.CloseAsync();
        }
    }

    public async Task<User> CreateUser(CreateUserRequest request)
    {
        var userNodeService = new NodeService<User>();
        var newUser = new User(request);

        using var session = _driver.AsyncSession();
        try
        {
            var result = await session.ExecuteWriteAsync(async tx =>
            {
                //var query = @"
                //CREATE (u:User {
                //    UserId: $UserId,
                //    DisplayName: $DisplayName,
                //    Email: $Email,
                //    IPAddress: $IPAddress,
                //    UserAgent: $UserAgent,
                //    SignUpTimestamp: $SignUpTimestamp,
                //})
                //RETURN u";

                //var parameters = new
                //{
                //    UserId = Guid.NewGuid(),
                //    DisplayName = request.DisplayName,
                //    Email = request.Email,
                //    IPAddress = request.IPAddress,
                //    UserAgent = request.UserAgent,
                //    SignUpTimestamp = DateTime.UtcNow,
                //};

                //var result = await tx.RunAsync(query, parameters);

                var userProperties = userNodeService.ToProperties(newUser);
                var result = await tx.RunAsync("CREATE (u:User $props)", new { props = userProperties });

                var record = await result.SingleAsync();
                var userNode = record["u"].As<INode>();

                User user = userNodeService.FromNode(userNode);

                return user;

            });

            return result;
        }
        catch (Exception ex)
        {
            // Handle the case when user creation fails or any other error occurs
            Console.WriteLine($"An error occurred while creating user: {ex.Message}");
            return null;
        }
        finally
        {
            await session.CloseAsync();
        }
    }

    public async Task<bool> CheckUserAccess(Guid userId, Guid recordId)
    {

        return false;
    }
    public async Task AddUserFollowRelationship(Guid userId, Guid personId)
    {

    }

}
