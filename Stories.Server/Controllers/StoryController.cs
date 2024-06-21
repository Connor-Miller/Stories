using Microsoft.AspNetCore.Mvc;
using Stories.Server.Models;
using Stories.Server.Repositories;


namespace Stories.Server.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class StoryController
{
    private readonly IStoryRepository _storyRepository;

    public StoryController(IStoryRepository storyRepository)
    {
        _storyRepository = storyRepository;
    }

    [HttpPost("story")]
    public Task AddStory(Story story, int personID, List<string> tagNames)
    {
        if (story == null)
        {
            var newStory = new Story(1, DateTime.Now, "New York", "Here is the story text. It will be longer eventually.");
            var tags = new List<string> { "Family Reunion", "Holiday" };

            return _storyRepository.AddStoryWithRelationships(newStory, 7, tags);

        }

        return _storyRepository.AddStoryWithRelationships(story, personID, tagNames);
    }
    [HttpGet("story")]
    public Task<Story> GetStory(int storyID) 
    {
        return _storyRepository.GetStory(storyID);
    }
    [HttpDelete("story")]
    public Task DeleteStory(int storyID)
    {
        return _storyRepository.DeleteStory(storyID);
    }
    [HttpGet("stories")]
    public Task<List<Story>> GetStories([FromQuery] StoryRequest request)
    {
        return _storyRepository.GetStories(request);
    }



}