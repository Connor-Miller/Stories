namespace Stories.Server.Models
{
    using System;

    public class User
    {
        public Guid UserId { get; set; }
        public string DisplayName { get; set; }
        public Guid PersonId { get; set; }
        public DateTime LoginTimestamp { get; set; }
        public DateTime SignUpTimestamp { get; set; }
        public string Email { get; set; }
        public string IPAddress { get; set; }
        public string UserAgent { get; set; }

        // Get User
        public User(string email, string name, Guid personId)
        {
            DisplayName = name;
            PersonId = personId;
            Email = email;
        }
        // New User
        public User(
            string displayName, 
            string email, 
            string iPAddress, 
            string userAgent
            )
        {
            DisplayName = displayName;
            UserId = new Guid();
            Email = email;
            IPAddress = iPAddress;
            UserAgent = userAgent;
            SignUpTimestamp = DateTime.Now;
        }
    }
}
