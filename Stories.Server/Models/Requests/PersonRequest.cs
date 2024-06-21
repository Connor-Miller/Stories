namespace Stories.Server.Models.Requests
{
    public class PersonRequest
    {

        public Person person { get; set; }
        public List<Relationship> relationships { get; set; }
    }
}
