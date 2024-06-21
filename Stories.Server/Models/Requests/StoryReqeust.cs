namespace Stories.Server.Models.Requests
{
    public class StoryReqeust
    {
        public Story story {  get; set; }
        public int personID { get; set; }
        public List<string> tagNames { get; set; }
    }
}
