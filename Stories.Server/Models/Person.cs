namespace Stories.Server.Models;

using System;
using System.ComponentModel.DataAnnotations;

public class Person
{

    [Key] // This attribute marks PersonID as the primary key
    public int PersonID { get; set; }

    [Required]
    [StringLength(100)] // This sets a maximum length for the Name property
    public string DisplayName { get; set; }
    public string BirthLocation { get; set; }
    public DateTime Birthday { get; set; }
    public DateTime? PersonCreatedTimeStamp { get; set; }
    public int UserID { get; set; }


    // New Person
    public Person(
        int personID, 
        string name, 
        DateTime birthday,
        string birthLocation = ""
        )
    {
        PersonID = personID;
        DisplayName = name;
        Birthday = birthday;
        PersonCreatedTimeStamp = DateTime.Now;
        UserID = 0;
        BirthLocation = birthLocation;
    }
    // Get Person Constructor
    public Person(
        int personID, 
        string displayName,
        DateTime birthday,
        string birthLocation = "",  
        int userID = 0,
        DateTime? personCreatedTimeStamp = null
        )
    {
        PersonID = personID;
        DisplayName = displayName;
        BirthLocation = birthLocation;
        Birthday = birthday;
        PersonCreatedTimeStamp = personCreatedTimeStamp;
        UserID = userID;

    }

    public Person() { }

}
