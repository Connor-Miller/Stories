namespace Stories.Server.Models
{
    public class FamilyTree
    {
        public List<Person> Persons { get; set; } = new List<Person>();
        public List<Relationship> Relationships { get; set; } = new List<Relationship>();

        
    }

}
