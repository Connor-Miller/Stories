namespace Stories.Server.Models
{
    public class Tag
    {
        public int TagID { get; set; }
        public string TagName { get; set; }

        public Tag(int tagID, string tagName)
        {
            TagID = tagID;
            TagName = tagName;
        }
        public Tag() { }

        // Optional: Override ToString() method for easier debugging and logging
        public override string ToString()
        {
            return $"TagID: {TagID}, TagName: {TagName}";
        }
    }

}
