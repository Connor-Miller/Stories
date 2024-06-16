using Microsoft.Extensions.Configuration;
using Neo4j.Driver;
using Stories.Server.Models;
using Stories.Server.Repositories;
using System.Runtime;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var mySettings = new Neo4jSettings();
builder.Configuration.GetSection("Neo4j").Bind(mySettings);

// Register the settings object with the dependency injection container
builder.Services.Configure<Neo4jSettings>(builder.Configuration.GetSection("Neo4j"));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IFamilyRepository, FamilyRepository>();
builder.Services.AddSingleton(GraphDatabase.Driver(
            mySettings.BaseURI,
            AuthTokens.Basic(
                mySettings.Username, 
                mySettings.Password
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
