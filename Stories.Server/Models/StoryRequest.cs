using Microsoft.AspNetCore.Mvc;

namespace Stories.Server.Models
{
    public class StoryRequest
    {
        [FromQuery]
        public string? Name { get; set; }

        [FromQuery]
        public int? PersonID { get; set; }

        [FromQuery]
        public string? Tag { get; set; }

        [FromQuery]
        public string? Location { get; set; }

        [FromQuery]
        public DateTime? BeginDateRange { get; set; }

        [FromQuery]
        public DateTime? EndDateRange { get; set; }
    }
}
