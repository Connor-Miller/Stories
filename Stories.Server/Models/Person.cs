namespace Stories.Server.Models;

using System;
using System.ComponentModel.DataAnnotations;

public class Person
{
    public Person(int personID, string name, DateTime birthday)
    {
        PersonID = personID;
        Name = name;
        Birthday = birthday;
    }

    [Key] // This attribute marks PersonID as the primary key
    public int PersonID { get; set; }

    [Required]
    [StringLength(100)] // This sets a maximum length for the Name property
    public string Name { get; set; }

    public DateTime Birthday { get; set; }
}
