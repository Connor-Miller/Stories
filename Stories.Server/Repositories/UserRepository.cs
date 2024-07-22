using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using FirebaseAdmin.Auth.Hash;
using Neo4j.Driver;
using Stories.Server.Models;
using Stories.Server.Models.Requests;

namespace Stories.Server.Repositories;

public interface IUserRepository
{

    Task<User> GetUserByEmail(string email);
    Task<User> CreateUser(CreateUserRequest request);
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
            //_queryConfig = new QueryConfig(database: Environment.GetEnvironmentVariable("NEO4J_DATABASE") ?? "movies");
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
        using var session = _driver.AsyncSession();
        try 
        {
            var result = await session.RunAsync(
                "MATCH (u:User {Email: $Email}) RETURN u",
                new { Email = email }
            );

            var record = await result.SingleAsync();

            var userNode = record["u"].As<INode>();
            var user = new User(
                userNode.Properties["Email"].As<string>(),
                userNode.Properties["DisplayName"].As<string>(),
                userNode.Properties["UserId"].As<Guid>()
            );

            return user;
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

    public async Task<User> CreateUser(CreateUserRequest request)
    {
        using var session = _driver.AsyncSession();
        try
        {
            var result = await session.ExecuteWriteAsync(async tx =>
            {
                var query = @"
                CREATE (u:User {
                    UserId: $UserId,
                    DisplayName: $DisplayName,
                    Email: $Email,
                    IPAddress: $IPAddress,
                    UserAgent: $UserAgent,
                    SignUpTimestamp: $SignUpTimestamp,
                })
                RETURN u";

                var parameters = new
                {
                    UserId = Guid.NewGuid(),
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    IPAddress = request.IPAddress,
                    UserAgent = request.UserAgent,
                    SignUpTimestamp = DateTime.UtcNow,
                };

                var result = await tx.RunAsync(query, parameters);
                var record = await result.SingleAsync();
                var userNode = record["u"].As<INode>();

                return new User(
                    userNode.Properties["DisplayName"].As<string>(),
                    userNode.Properties["Email"].As<string>(),
                    userNode.Properties["IPAddress"].As<string>(),
                    userNode.Properties["UserAgent"].As<string>()
                )
                {
                    UserId = userNode.Properties["UserId"].As<Guid>(),
                    SignUpTimestamp = userNode.Properties["SignUpTimestamp"].As<DateTime>()
                };
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

}
