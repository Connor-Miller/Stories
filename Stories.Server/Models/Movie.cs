using System.Collections.Generic;

namespace Stories.Server.Models;

public record Movie(
    string Title,
    IEnumerable<Person> Cast = null,
    long? Released = null,
    string Tagline = null,
    long? Votes = null);
