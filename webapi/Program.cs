using Gamerize.BLL.AutoMapper;
using Gamerize.DAL.Contexts;
using Microsoft.EntityFrameworkCore;
using webapi.Extensions.DI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApiDbContext>(options => options.UseSqlServer(
	builder.Configuration.GetConnectionString("SqlConnection")));
builder.Services.AddAutoMapper(typeof(ToDtoMappingProfile));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
	options.AddPolicy("AllowAnyOrigin", builder =>
		{
			builder.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader();
		})
	);

// Add Dependency Injections to the container
builder.Services.AddDependencyInjections();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	//app.UseSwagger();
	//app.UseSwaggerUI();
}
else
{
	app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowAnyOrigin");
app.UseHttpsRedirection();


app.MapControllers();
app.MapFallbackToFile("/index.html");
//app.MapCateroryEndpoints();
app.Run();