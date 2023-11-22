using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.DAL.Entities.Shop;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace webapi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class CategoryController : ControllerBase
	{
		private readonly IService<Category, CategoryDTO> _shopService;

		public CategoryController(IService<Category, CategoryDTO> shopService)
		{
			_shopService = shopService;
		}

		[HttpGet("GetAll")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public async Task<ActionResult<ICollection<CategoryDTO>>> Get()
		{
			try
			{
				return Ok(await _shopService.GetAllAsync());
			}
			catch
			{
				return StatusCode(500, "Internal Server Error. Please try again later.");
			}
		}

		[HttpGet("GetById/{id:int}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public async Task<ActionResult<CategoryDTO>> GetById(int id)
		{
			try
			{
				return Ok(await _shopService.GetByIdAsync(id));
			}
			catch
			{
				return StatusCode(500, "Internal Server Error. Please try again later.");
			}
		}

		[HttpPost("Create")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public async Task<IActionResult> Create([FromBody] CategoryDTO categoryDTO)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest();
				await _shopService.CreateAsync(categoryDTO);
				return NoContent();
			}
			catch
			{
				return StatusCode(500, "Internal Server Error. Please try again later.");
			}
		}

		[HttpPatch("Update")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public async Task<ActionResult<ICollection<CategoryDTO>>> Update([FromBody] CategoryDTO categoryDTO)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest();
				await _shopService.UpdateAsync(categoryDTO, categoryDTO.Id);
				return NoContent();
			}
			catch
			{
				return StatusCode(500, "Internal Server Error. Please try again later.");
			}
		}

		//[HttpDelete("Delete")]
		//public async Task<IActionResult> Delete([FromBody] int id)
		//{
		//	return (ModelState.IsValid && await _shopService.DeleteCategoryAsync(id)) 
		//		? NoContent() 
		//		: BadRequest();
		//}
	}
}
