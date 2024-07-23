namespace Stories.Server.Models;

using System;
using System.ComponentModel.DataAnnotations;

public class Person
{

    [Key] // This attribute marks PersonID as the primary key
    public Guid PersonId { get; set; }

    [Required]
    [StringLength(100)] // This sets a maximum length for the Name property
    public string DisplayName { get; set; }
    public string BirthLocation { get; set; }
    public DateTime Birthday { get; set; }
    public DateTime PersonCreatedTimeStamp { get; set; }
    public Guid? UserId { get; set; }
    public Guid CreatedById { get; set; }

    // New Person
    public Person(
        Guid createdById, 
        string name, 
        DateTime birthday,
        string birthLocation = ""
        )
    {
        PersonId = new Guid();
        CreatedById = createdById;
        DisplayName = name;
        Birthday = birthday;
        PersonCreatedTimeStamp = DateTime.Now;
        BirthLocation = birthLocation;
    }
    // Get Person Constructor
    public Person(
        Guid personId, 
        string displayName,
        DateTime birthday,
        string birthLocation,  
        Guid userId,
        Guid createdById,
        DateTime personCreatedTimeStamp
        )
    {
        PersonId = personId;
        CreatedById = createdById;
        DisplayName = displayName;
        BirthLocation = birthLocation;
        Birthday = birthday;
        PersonCreatedTimeStamp = personCreatedTimeStamp;
        UserId = userId;

    }

    public Person() { }

}
