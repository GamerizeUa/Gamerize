using Gamerize.BLL.AutoMapper;
using Gamerize.BLL.Services;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.DAL.Contexts;
using Gamerize.DAL.Entities.Admin;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;
using webapi.Extensions.DI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApiDbContext>(options => options.UseSqlServer(
	builder.Configuration.GetConnectionString("SqlConnection")));

builder.Services.AddAutoMapper(typeof(ToDtoMappingProfile));
builder.Services.AddScoped<TokenService>();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
	options.AddPolicy("AllowAnyOrigin", builder =>
		{
			builder.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader();
		})
	);

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ApiDbContext>()
    .AddUserManager<UserManager<User>>()
    .AddDefaultTokenProviders();

// Add some extensions
builder.Services.AddDependencyInjections();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}
else
{
	app.UseSwagger();
	app.UseSwaggerUI();
	app.UseHsts();
}

app.UseCors("AllowAnyOrigin");
app.UseHttpsRedirection();

app.MapControllers();
app.MapFallbackToFile("index.html");
app.Run();