using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Stories.Server.Models;
using Stories.Server.Repositories;


namespace Stories.Server.Controllers;

[ApiController]
[Route("api/testdata")]
public class TestDataController
{
    private readonly IMovieRepository _movieRepository;

    public TestDataController(IMovieRepository movieRepository)
    {
        _movieRepository = movieRepository;
    }

    
}