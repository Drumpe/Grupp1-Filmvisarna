using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Add database support
builder.Services.AddDbContext<FilmvisarnaContext>(options => {
    var connectionString = builder.Configuration.GetConnectionString("WebApiDatabase");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});;

// Add WebSocket connection manager for SeatStatusFeed 
builder.Services.AddWebSocketConnectionManager();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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

app.MapControllers();

app.Run();
