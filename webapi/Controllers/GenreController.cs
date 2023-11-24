using Gamerize.BLL.Models;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.DAL.Entities.Shop;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class GenreController : ControllerBase
	{
		private readonly IService<Genre, GenreDTO> _shopService;

		public GenreController(IService<Genre, GenreDTO> shopService)
		{
			_shopService = shopService;
		}

		[HttpGet("GetAll")]
		public async Task<ActionResult<ICollection<GenreDTO>>> Get()
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
		public async Task<ActionResult<GenreDTO>> GetById(int id)
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
		public async Task<IActionResult> Create([FromBody] GenreDTO categoryDTO)
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
		public async Task<ActionResult<ICollection<GenreDTO>>> Update([FromBody] GenreDTO categoryDTO)
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

		[HttpDelete("Delete/{id:int}")]
		public async Task<IActionResult> Delete(int id)
		{
			try
			{
				await _shopService.DeleteAsync(id);
				return NoContent();
			}
			catch (ArgumentException ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
