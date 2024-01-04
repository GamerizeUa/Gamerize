using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.Common.Extensions.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Extensions.APIs
{
	public static class CateroriesEndpoints
	{
		public static void MapCateroryEndpoints(this IEndpointRouteBuilder app)
		{
			var group = app.MapGroup("api/ProductsTest");

			group.MapPost("", CreateCategoty).WithName("Create").WithOpenApi();
			group.MapGet("", GetAllAsync).WithOpenApi();
			group.MapGet("{id}", GetById).WithName("GetById").WithOpenApi();
			group.MapPut("", UpdateCategory).WithName("Update").WithOpenApi();
			group.MapDelete("", DeleteCategory).WithName("Delete").WithOpenApi();

		}

		private static async Task<IResult> GetAllAsync(CategorySevice service)
		{
			try
			{
				return Results.Ok(await service.GetAllAsync());
			}
			catch (ServerErrorException ex)
			{
				return Results.Problem(detail: ex.Message, statusCode: 500);
			}
		}

		private static async Task<IResult> GetById(int id, CategorySevice service)
		{
			try
			{
				return Results.Ok(await service.GetByIdAsync(id));
			}
			catch (InvalidIdException ex)
			{
				return Results.NotFound(ex.Message);
			}
			catch (ServerErrorException ex)
			{
				return Results.Problem(detail: ex.Message, statusCode: 500);
			}
		}

		private static async Task<IResult> CreateCategoty([FromBody] CategoryDTO newCategory, CategorySevice service)
		{
			try
			{
				return Results.Ok(await service.CreateAsync(newCategory));
			}
			catch (DuplicateItemException ex)
			{
				return Results.BadRequest(ex.Message);
			}
			catch (ServerErrorException ex)
			{
				return Results.Problem(detail: ex.Message, statusCode: 500);
			}
		}

		private static async Task<IResult> UpdateCategory([FromBody] CategoryDTO updateCategory, CategorySevice service)
		{
			try
			{
				return Results.Ok(await service.UpdateAsync(updateCategory));
			}
			catch (InvalidIdException ex)
			{
				return Results.NotFound(ex.Message);
			}
			catch (ServerErrorException ex)
			{
				return Results.Problem(detail: ex.Message, statusCode: 500);
			}
		}

		private static async Task<IResult> DeleteCategory(int id, CategorySevice service)
		{
			try
			{
				await service.DeleteAsync(id);
				return Results.NoContent();
			}
			catch (InvalidIdException ex)
			{
				return Results.NotFound(ex.Message);
			}
			catch (ServerErrorException ex)
			{
				return Results.Problem(detail: ex.Message, statusCode: 500);
			}
		}
	}
}
