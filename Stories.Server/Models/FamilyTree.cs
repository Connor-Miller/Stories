namespace Stories.Server.Models
{
    public class FamilyTree
    {
        public List<Person> Persons { get; set; } = new List<Person>();
        public List<Relationship> Relationships { get; set; } = new List<Relationship>();

        public class Relationship
        {
            public int From { get; set; }
            public int To { get; set; }
            public string Type { get; set; }
        }
    }

}
