namespace Stories.Server.Models
{
    public class Story
    {
        public int StoryID { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string StoryText { get; set; }

        public Story(int storyID, DateTime date, string location, string storyText)
        {
            StoryID = storyID;
            Date = date;
            Location = location;
            StoryText = storyText;
        }
        public Story() { }

        // Optional: Override ToString() method for easier debugging and logging
        public override string ToString()
        {
            return $"StoryID: {StoryID}, Date: {Date.ToShortDateString()}, Location: {Location}";
        }
    }

}
