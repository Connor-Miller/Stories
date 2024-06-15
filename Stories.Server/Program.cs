// PW for Instance01 of neo4j
// Username: neo4j
// QPwm6n1YRSNovOMe89cc2zPrJ5jRncDNgBW3qzU7SQI

using Neo4j.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton(GraphDatabase.Driver(
            Environment.GetEnvironmentVariable("NEO4J_URI") ?? "neo4j+s://demo.neo4jlabs.com",
            AuthTokens.Basic(
                Environment.GetEnvironmentVariable("NEO4J_USER") ?? "movies", 
                Environment.GetEnvironmentVariable("NEO4J_PASSWORD") ?? "movies"
            )
        ));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
