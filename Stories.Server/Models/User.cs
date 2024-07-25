namespace Stories.Server.Models
{
    using Stories.Server.Models.Requests;
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

        public User() { }

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
        // New User
        public User(
            CreateUserRequest request
            )
        {
            DisplayName = request.DisplayName;
            UserId = new Guid();
            Email = request.Email;
            IPAddress = request.IPAddress;
            UserAgent = request.UserAgent;
            SignUpTimestamp = DateTime.Now;
        }
        // Get User
        public User(
            Guid userId, 
            string displayName, 
            Guid personId, 
            DateTime loginTimestamp, 
            DateTime signUpTimestamp, 
            string email, 
            string iPAddress, 
            string userAgent
            )
        {
            UserId = userId;
            DisplayName = displayName;
            PersonId = personId;
            LoginTimestamp = loginTimestamp;
            SignUpTimestamp = signUpTimestamp;
            Email = email;
            IPAddress = iPAddress;
            UserAgent = userAgent;
        }
    }
}
