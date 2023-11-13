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

		[HttpGet("GetAllCategories")]
		public async Task<ActionResult<ICollection<CategoryDTO>>> Get()
		{
			return Ok(await _shopService.GetCategoriesAsync());
		}

		[HttpGet("GetCategoryById/{id}")]
		public async Task<ActionResult<CategoryDTO>> Get(int id)
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

		[HttpPost("AddCategory")]
		public async Task<IActionResult> Add([FromBody] CategoryDTO categoryDTO)
		{
			if (ModelState.IsValid && await _shopService.AddCategoryAsync(categoryDTO))
				return NoContent();
			return BadRequest();
		}

		[HttpPatch("UpdateCategory")]
		public async Task<IActionResult> Update([FromBody] CategoryDTO categoryDTO)
		{
			if (ModelState.IsValid && await _shopService.UpdateCategoryAsync(categoryDTO))
				return NoContent();
			return BadRequest();
		}

		[HttpDelete("DeleteCategoryById/{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			if (ModelState.IsValid && await _shopService.DeleteCategoryAsync(id))
				return NoContent();
			return BadRequest();
		}
	}
}
