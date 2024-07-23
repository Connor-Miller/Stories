using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stories.Server.Models;
using Stories.Server.Models.Requests;
using Stories.Server.Repositories;
using System.Security.Claims;


namespace Stories.Server.Controllers;

[Authorize]
[ApiController]
[Route("api/[Controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet("test")]
    public IActionResult FirebaseTest()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Ok($"Hello, authenticated user {userId}!");
    }

    [HttpGet("{email}")]
    public Task<User> GetUser(string email)
    {
        return _userRepository.GetUserByEmail(email);
    }

    [HttpPost("signup")]
    public Task CreateUser(CreateUserRequest request)
    {
        return _userRepository.CreateUser(request);
    }
 

}