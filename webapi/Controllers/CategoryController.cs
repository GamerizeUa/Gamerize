using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class CategoryController : ControllerBase
	{
		private readonly ShopService _shopService;

		public CategoryController(ShopService shopService)
		{
			_shopService = shopService;
		}

		[HttpGet("GetAll")]
		public async Task<ActionResult<ICollection<CategoryDTO>>> Get()
		{
			return Ok(await _shopService.GetCategoriesAsync());
		}

		[HttpGet("GetById")]
		public async Task<ActionResult<CategoryDTO>> GetById([FromQuery] int id)
		{
			try
			{
				return Ok(await _shopService.GetCategoryByIdAsync(id));
			}
			catch (ArgumentException ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("Create")]
		public async Task<ActionResult<ICollection<CategoryDTO>>> Create([FromBody] CategoryDTO categoryDTO)
		{
			return (ModelState.IsValid && await _shopService.AddCategoryAsync(categoryDTO))
				? Ok(await _shopService.GetCategoriesAsync())
				: BadRequest();
		}

		[HttpPatch("Update")]
		public async Task<ActionResult<ICollection<CategoryDTO>>> Update([FromBody] CategoryDTO categoryDTO)
		{
			return (ModelState.IsValid && await _shopService.UpdateCategoryAsync(categoryDTO)) 
				? Ok(await _shopService.GetCategoriesAsync()) 
				: BadRequest();
		}

		[HttpDelete("Delete")]
		public async Task<IActionResult> Delete([FromQuery] int id)
		{
			return (ModelState.IsValid && await _shopService.DeleteCategoryAsync(id)) 
				? NoContent() 
				: BadRequest();
		}
	}
}
