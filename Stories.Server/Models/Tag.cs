namespace Stories.Server.Models
{
    public class Tag
    {
        public int TagId { get; set; }
        public string TagName { get; set; }

        public Tag(int tagID, string tagName)
        {
            TagId = tagID;
            TagName = tagName;
        }
        public Tag() { }

        // Optional: Override ToString() method for easier debugging and logging
        public override string ToString()
        {
            return $"TagId: {TagId}, TagName: {TagName}";
        }
    }

}
