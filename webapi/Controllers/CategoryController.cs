using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.Common.Extensions.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class CategoryController : ControllerBase
	{
		private readonly CategorySevice _sevice;
		public CategoryController(CategorySevice service)
		{
			_sevice = service;
		}

		[HttpGet("GetAll")]
		public async Task<ActionResult<ICollection<CategoryDTO>>> Get()
		{
			try
			{
				return Ok(await _sevice.GetAllCategoriesAsync());
			}
			catch (ServerErrorException ex)
			{
				return StatusCode(500, ex.Message);
			}
		}

		[HttpGet("GetById/{id:int}")]
		public async Task<ActionResult<CategoryDTO>> GetById(int id)
		{
			try
			{
				return Ok(await _sevice.GetCategoryAsync(id));
			}
			catch (InvalidIdException ex)
			{
				return StatusCode(400, ex.Message);
			}
			catch (ServerErrorException ex)
			{
				return StatusCode(500, ex.Message);
			}
		}

		[HttpPost("Create")]
		public async Task<ActionResult<CategoryDTO>> CreateCategoty([FromBody] CategoryDTO newCategory)
		{
			try
			{
				return (!ModelState.IsValid) ?
					BadRequest() :
					Ok(await _sevice.AddNewCategoryAsync(newCategory));
			}
			catch (DuplicateItemException ex)
			{
				return StatusCode(400, ex.Message);
			}
			catch (ServerErrorException ex)
			{
				return StatusCode(500, ex.Message);
			}
		}

		[HttpPatch("Update")]
		public async Task<ActionResult<CategoryDTO>> UpdateCategory([FromBody] CategoryDTO updateCategory)
		{
			try
			{
				return (!ModelState.IsValid) ? 
					BadRequest() : 
					Ok(await _sevice.UpdateCategoryAsync(updateCategory));
			}
			catch (InvalidIdException ex)
			{
				return StatusCode(400, ex.Message);
			}
			catch (ServerErrorException ex)
			{
				return StatusCode(500, ex.Message);
			}
		}

		[HttpDelete("Delete/{id:int}")]
		public async Task<IActionResult> Delete(int id)
		{
			try
			{
				await _sevice.DeleteCategoryAsync(id);
				return NoContent();
			}
			catch (InvalidIdException ex)
			{
				return StatusCode(400, ex.Message);
			}
			catch (ServerErrorException ex)
			{
				return StatusCode(500, ex.Message);
			}
		}
	}
}
