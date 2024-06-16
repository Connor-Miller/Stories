using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Stories.Server.Models;
using Stories.Server.Repositories;


namespace Stories.Server.Controllers;

[ApiController]
[Route("api/testdata")]
public class TestDataController
{
    private readonly IFamilyRepository _familyRepository;

    public TestDataController(IFamilyRepository familyRepository)
    {
        _familyRepository = familyRepository;
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

}