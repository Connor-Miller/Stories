namespace Stories.Server.Models.Requests
{
    public class CreateUserRequest
    {
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string? IPAddress { get; set; }
        public string? UserAgent { get; set; }
    }
}