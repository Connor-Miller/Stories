using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Stories.Server.Repositories;
using Stories.Server.Models;

namespace Stories.Server.Controllers;

[ApiController]
[Route("search")]
public class SearchController
{
    private readonly IFamilyRepository _movieRepository;

    public SearchController(IFamilyRepository movieRepository)
    {
        _movieRepository = movieRepository;
    }

    [HttpGet]
    public Task<List<Movie>> SearchMovies([FromQuery(Name = "q")] string search)
    {
        //return _movieRepository.Search(search);

        return null;
    }
}