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
    private readonly IPersonRepository _personRepository;

    public UserController(IUserRepository userRepository, IPersonRepository personRepository)
    {
        _userRepository = userRepository;
        _personRepository = personRepository;
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

    [HttpPost("login")]
    public IActionResult Login(CreateUserRequest request)
    {
        // Return Logged in user if already created
        var user = _userRepository.GetUserByEmail(request.Email);
        if (user != null) return Ok(user);

        // Create User if first time login
        User newUser = _userRepository.CreateUser(request);

        if (newUser == null) return BadRequest("User could not be found or created");

        // Create the corresponding Person
        var person = new Person(newUser.UserId, newUser.DisplayName, null);
        var newPerson = _personRepository.CreatePerson(person);

        return BadRequest("User could not be found or created");
    }
 

}