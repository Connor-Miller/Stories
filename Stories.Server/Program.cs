using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Neo4j.Driver;
using Stories.Server.Models;
using Stories.Server.Repositories;
using Stories.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Initialize Firebase Admin SDK
FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile(
        Path.Combine(
            AppDomain.CurrentDomain.BaseDirectory, 
            "Configs/firebase-adminsdk.json"
            )
        ),
});

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
builder.Services.AddScoped<IStoryRepository, StoryRepository>();

builder.Services.AddSingleton(GraphDatabase.Driver(
            mySettings.BaseURI,
            AuthTokens.Basic(
                mySettings.Username, 
                mySettings.Password
            )
        ));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://securetoken.google.com/our-legacy-91adb";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "https://securetoken.google.com/our-legacy-91adb",
            ValidateAudience = true,
            ValidAudience = "our-legacy-91adb",
            ValidateLifetime = true
        };
    });
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "Firebase";
    options.DefaultChallengeScheme = "Firebase";
})
.AddScheme<AuthenticationSchemeOptions, FirebaseAuthenticationHandler>("Firebase", options => { });

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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
