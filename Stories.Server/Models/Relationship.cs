namespace Stories.Server.Models
{
    public class Relationship
    {
        public Guid From { get; set; }
        public string FromType { get; set; }
        public Guid To { get; set; }
        public string ToType { get; set; }
        public string Type { get; set; }
    }
}
