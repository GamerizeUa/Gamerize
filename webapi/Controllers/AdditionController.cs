using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AdditionController : ControllerBase
	{
		private readonly ShopService _shopService;

		public AdditionController(ShopService shopService)
		{
			_shopService = shopService;
		}

		[HttpGet("GetAllGenres")]
		public async Task<ActionResult<ICollection<GenreDTO>>> GetAllGenres()
		{
			return Ok();
		}
		[HttpGet("GetAllTags")]
		[ProducesResponseType(typeof(string), 500)]
		public async Task<ActionResult<ICollection<TagDTO>>> GetAllTags()
		{
			try
			{
				return Ok(await _shopService.GetTagsAsync());
			}
			catch
			{
				return StatusCode(500, "No connection to database");
			}
		}
		[HttpGet("GetTagById")]
		public async Task<ActionResult<TagDTO>> GetTagById([FromQuery]int id)
		{
			try
			{
				return Ok(await _shopService.GetTagById(id));
			}
			catch (ArgumentException ex)
			{
				return BadRequest(ex.Message);
			}
		}
		[HttpPost("CreateTag")]
		public async Task<IActionResult> CreateTag([FromBody] TagDTO tagDTO)
		{
			return (ModelState.IsValid && await _shopService.AddTagAsync(tagDTO)) ?
				Created() :
				BadRequest();
		}
		[HttpGet("GetAllThemes")]
		public async Task<ActionResult<ICollection<ThemeDTO>>> GetAllThemes()
		{
			return Ok();
		}
		[HttpGet("GetAllLanguages")]
		public async Task<ActionResult<ICollection<LanguageDTO>>> GetAllLanguages()
		{
			return Ok();
		}
	}
}
