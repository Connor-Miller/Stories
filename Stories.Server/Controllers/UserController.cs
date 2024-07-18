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
    private readonly IFamilyRepository _familyRepository;

    public UserController(IFamilyRepository familyRepository)
    {
        _familyRepository = familyRepository;
    }

    [HttpGet("test")]
    public IActionResult FirebaseTest()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Ok($"Hello, authenticated user {userId}!");
    }

    [HttpGet("familytree")]
    public Task<FamilyTree> GetFamilyTree()
    {
        return _familyRepository.GetFamilyTree();
    }

    [HttpPost("familytree")]
    public Task PostFamilyTree()
    {
        return _familyRepository.PopulateFamilyTreeData();
    }
    [HttpDelete("familytree")]
    public Task DeleteFamilyTree()
    {
        return _familyRepository.DeleteAllFamilyTreeData();
    }

    [HttpGet("descendants/{id}")]
    public Task<List<Person>> GetDescendants(int id)
    {
        return _familyRepository.GetDescendants(id);
    }
    [HttpGet("ancestors/{id}")]
    public Task<List<Person>> GetAncestors(int id)
    {
        return _familyRepository.GetAncestors(id);
    }
    [HttpPost("person")]
    public Task AddPerson(PersonRequest personRequest)
    {
        return _familyRepository.AddPersonWithRelationships(personRequest.person, personRequest.relationships);
    }

}