using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using Neo4j.Driver;
using Stories.Server.Models;
using Stories.Server.Models.Requests;

namespace Stories.Server.Repositories;

public interface IUserRepository
{


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

   



}
