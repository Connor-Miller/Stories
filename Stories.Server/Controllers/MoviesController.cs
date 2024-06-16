using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Stories.Server.Models;
using Stories.Server.Repositories;

namespace Stories.Server.Controllers;

[ApiController]
[Route("movie")]
public class MoviesController : ControllerBase
{
    private readonly IFamilyRepository _movieRepository;

    public MoviesController(IFamilyRepository movieRepository)
    {
        _movieRepository = movieRepository;
    }

    [Route("{title}")]
    [HttpGet]
    public Task<Movie> GetMovieDetails([FromRoute] string title)
    {
        if (title == "favicon.ico")
            return null;

        title = System.Net.WebUtility.UrlDecode(title);
        //return _movieRepository.FindByTitle(title);

        return null;
    }

    [Route("{title}/vote")]
    [HttpPost]
    public Task<int> VoteInMovie([FromRoute] string title)
    {
        title = System.Net.WebUtility.UrlDecode(title);
        //return _movieRepository.VoteByTitle(title);

        return null;
    }
}
