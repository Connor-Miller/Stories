namespace Stories.Server.Models;

using System;
using System.ComponentModel.DataAnnotations;

public class Person
{
    [Key] // This attribute marks PersonID as the primary key
    public int PersonID { get; set; }

    [Required]
    [StringLength(100)] // This sets a maximum length for the Name property
    public string Name { get; set; }

    public DateTime Birthday { get; set; }
}
