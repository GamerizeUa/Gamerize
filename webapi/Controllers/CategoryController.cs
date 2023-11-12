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

		[HttpGet]
		public async Task<ActionResult<ICollection<CategoryDTO>>> Get()
		{
			return Ok(await _shopService.GetCategoriesAsync());
		}

		[HttpGet("{id}")]
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

		[HttpPost]
		public async Task<IActionResult> Add([FromBody] CategoryDTO categoryDTO)
		{
			if (ModelState.IsValid && await _shopService.AddCategoryAsync(categoryDTO))
				return NoContent();
			return BadRequest();
		}

		[HttpPatch]
		public async Task<IActionResult> Update([FromBody] CategoryDTO categoryDTO)
		{
			if (ModelState.IsValid && await _shopService.UpdateCategoryAsync(categoryDTO))
				return NoContent();
			return BadRequest();
		}
	}
}
