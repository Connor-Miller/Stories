namespace Stories.Server.Models
{
    public class Relationship
    {
        public Guid From { get; set; }
        public Guid To { get; set; }
        public string Type { get; set; }
    }
}
