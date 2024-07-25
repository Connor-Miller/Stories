namespace Stories.Server.Models
{
    public class Story
    {
        public int StoryId { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string StoryText { get; set; }

        public Story(int storyId, DateTime date, string location, string storyText)
        {
            StoryId = storyId;
            Date = date;
            Location = location;
            StoryText = storyText;
        }
        public Story() { }

        // Optional: Override ToString() method for easier debugging and logging
        public override string ToString()
        {
            return $"StoryId: {StoryId}, Date: {Date.ToShortDateString()}, Location: {Location}";
        }
    }

}
