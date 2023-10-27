using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Middleware;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:5173").AllowAnyMethod();
        });
});

//Add database support
builder.Services.AddDbContext<FilmvisarnaContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("WebApiDatabase");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
}); ;

// Add WebSocket connection manager for SeatStatusFeed 
builder.Services.AddWebSocketConnectionManager();

// Create session
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.Cookie.Name = ".FilmvisarnaCookie.Session";
    options.Cookie.IsEssential = true;
    options.Cookie.HttpOnly = true; // Protect from Cross-Side-Scripting (XSS)
    options.IdleTimeout = TimeSpan.FromMinutes(30);
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// SeatStatusFeed middleware
app.UseWebSockets();
app.UseSeatStatusFeed();

app.UseSession(); // Use session call
app.UseUserRoles(); // Call to custom middleware

app.MapControllers();

app.Run();
