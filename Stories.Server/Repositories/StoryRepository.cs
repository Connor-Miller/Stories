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

public interface IStoryRepository
{
    //Task<Movie> FindByTitle(string title);
    //Task<int> VoteByTitle(string title);
    //Task<List<Movie>> Search(string search);
    //Task<D3Graph> FetchD3Graph(int limit);
    Task AddStoryWithRelationships(Story story, int personID, List<string> tagNames);
    Task<Story> GetStory(int storyID);
    Task<bool> DeleteStory(int storyID);
    Task<bool> UpdateStory(Story story);
    Task<List<Story>> GetStories(StoryListRequest storyRequest);

}

public class StoryRepository : IStoryRepository
{
    private readonly IDriver _driver;
    private readonly QueryConfig _queryConfig;

    public StoryRepository(IDriver driver)
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

    public async Task AddStoryWithRelationships(Story story, int personID, List<string> tagNames)
    {
        using var session = _driver.AsyncSession();
        try
        {
            // Create the story node
            await session.RunAsync(
                "CREATE (s:Story {StoryID: $StoryID, Date: $Date, Location: $Location, StoryText: $StoryText})",
                new { story.StoryID, story.Date, story.Location, story.StoryText }
            );

            // Create a relationship between the story and the person
            await session.RunAsync(
                @"
            MATCH (p:Person {PersonID: $PersonID})
            MATCH (s:Story {StoryID: $StoryID})
            CREATE (p)-[:TELLS_STORY]->(s)",
                new { PersonID = personID, StoryID = story.StoryID }
            );

            // Handle tag relationships
            foreach (var tagName in tagNames)
            {
                // Check if the tag exists
                var result = await session.RunAsync(
                    "MATCH (t:Tag {TagName: $TagName}) RETURN t",
                    new { TagName = tagName }
                );

                INode tagNode = null;
                if (await result.FetchAsync())
                {
                    tagNode = result.Current["t"].As<INode>();
                }

                // If the tag doesn't exist, create it
                if (tagNode == null)
                {
                    await session.RunAsync(
                        "CREATE (t:Tag {TagID: $TagID, TagName: $TagName})",
                        new { TagID = Guid.NewGuid().GetHashCode(), TagName = tagName }
                    );
                }

                // Create a relationship between the story and the tag
                await session.RunAsync(
                    @"
                MATCH (s:Story {StoryID: $StoryID})
                MATCH (t:Tag {TagName: $TagName})
                CREATE (s)-[:TAGGED_WITH]->(t)",
                    new { StoryID = story.StoryID, TagName = tagName }
                );
            }
        }
        finally
        {
            await session.CloseAsync();
        }
    }
    public async Task<Story> GetStory(int storyId)
    {
        using var session = _driver.AsyncSession();
        try
        {
            var result = await session.RunAsync(
                "MATCH (s:Story {StoryID: $StoryID}) RETURN s",
                new { StoryID = storyId }
            );

            var record = await result.SingleAsync();

            var storyNode = record["s"].As<INode>();
            var story = new Story(
                storyNode.Properties["StoryID"].As<int>(),
                DateTime.Parse(storyNode.Properties["Date"].As<string>()),
                storyNode.Properties["Location"].As<string>(),
                storyNode.Properties["StoryText"].As<string>()
            );

            return story;
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
    public async Task<bool> DeleteStory(int storyId)
    {
        using var session = _driver.AsyncSession();
        try
        {
            var result = await session.RunAsync(
                "MATCH (s:Story {StoryID: $StoryID}) DETACH DELETE s",
                new { StoryID = storyId }
            );

            var summary = await result.ConsumeAsync();

            return summary.Counters.NodesDeleted > 0;
        }
        catch (Exception ex)
        {
            // Handle any errors that might occur during the deletion process
            Console.WriteLine($"An error occurred: {ex.Message}");
            return false;
        }
        finally
        {
            await session.CloseAsync();
        }
    }
    public async Task<bool> UpdateStory(Story updatedStory)
    {
        using var session = _driver.AsyncSession();
        try
        {
            var result = await session.RunAsync(
                @"
            MATCH (s:Story {StoryID: $StoryID})
            SET s.Location = $Location, s.Date = $Date, s.StoryText = $StoryText
            RETURN s",
                new
                {
                    Location = updatedStory.Location,
                    Date = updatedStory.Date.ToString("yyyy-MM-dd"), // Format date as needed
                    StoryText = updatedStory.StoryText
                }
            );

            var record = await result.SingleAsync();

            return record != null;
        }
        catch (Exception ex)
        {
            // Handle any errors that might occur during the update process
            Console.WriteLine($"An error occurred: {ex.Message}");
            return false;
        }
        finally
        {
            await session.CloseAsync();
        }
    }

    public async Task<List<Story>> GetStories(StoryListRequest request)
    {
        using var session = _driver.AsyncSession();
        var query = new List<string>();
        var parameters = new Dictionary<string, object>();

        if (request.Name != null)
        {
            query.Add("p.Name CONTAINS $Name");
            parameters.Add("Name", request.Name);
        }

        if (request.PersonID.HasValue)
        {
            query.Add("p.PersonID = $PersonID");
            parameters.Add("PersonID", request.PersonID);
        }

        if (request.Tag != null)
        {
            query.Add("t.TagName = $Tag");
            parameters.Add("Tag", request.Tag);
        }

        if (request.Location != null)
        {
            query.Add("s.Location = $Location");
            parameters.Add("Location", request.Location);
        }

        if (request.BeginDateRange.HasValue)
        {
            query.Add("s.Date >= $BeginDateRange");
            parameters.Add("BeginDateRange", request.BeginDateRange.Value.ToString("yyyy-MM-dd"));
        }

        if (request.EndDateRange.HasValue)
        {
            query.Add("s.Date <= $EndDateRange");
            parameters.Add("EndDateRange", request.EndDateRange.Value.ToString("yyyy-MM-dd"));
        }

        var queryString = @"
        MATCH (s:Story)
        OPTIONAL MATCH (s)-[:TAGGED_WITH]->(t:Tag)
        OPTIONAL MATCH (p:Person)-[:RELATED_TO]->(s)
        WHERE " + string.Join(" AND ", query) + @"
        RETURN s, t, p";

        var result = await session.RunAsync(queryString, parameters);
        var stories = new List<Story>();

        await result.ForEachAsync(record =>
        {
            var storyNode = record["s"].As<INode>();
            var story = new Story(
                storyNode.Properties["StoryID"].As<int>(),
                DateTime.Parse(storyNode.Properties["Date"].As<string>()),
                storyNode.Properties["Location"].As<string>(),
                storyNode.Properties["StoryText"].As<string>()
            );
            stories.Add(story);
        });

        return stories;
    }



}
