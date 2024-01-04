using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.Common.Extensions.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TagController : ControllerBase
	{
		private readonly TagService _service;
		public TagController(TagService service)
		{
			_service = service;
		}

		[HttpGet("GetAll")]
		public async Task<ActionResult<ICollection<TagDTO>>> GetAll()
		{
			try
			{
				return Ok(await _service.GetAllAsync());
			}
			catch (ServerErrorException ex)
			{
				return StatusCode(500, ex.Message);
			}
		}

		[HttpGet("GetById/{id:int}")]
		public async Task<ActionResult<TagDTO>> GetById(int id)
		{
			try
			{
				return Ok(await _service.GetByIdAsync(id));
			}
			catch (InvalidIdException ex)
			{
				return StatusCode(404, ex.Message);
			}
			catch (ServerErrorException ex)
			{
				return StatusCode(500, ex.Message);
			}
		}

		[HttpPost("Create")]
		public async Task<ActionResult<TagDTO>> Create([FromBody] TagDTO newTag)
		{
			try
			{
				return (!ModelState.IsValid) ?
						BadRequest() :
						Ok(await _service.CreateAsync(newTag));
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
		public async Task<ActionResult<TagDTO>> UpdateCategory([FromBody] TagDTO updateTag)
		{
			try
			{
				return (!ModelState.IsValid) ?
					BadRequest() :
					Ok(await _service.UpdateAsync(updateTag));
			}
			catch (InvalidIdException ex)
			{
				return StatusCode(400, ex.Message);
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

		[HttpDelete("Delete/{id:int}")]
		public async Task<IActionResult> DeleteCategory(int id)
		{
			try
			{
				await _service.DeleteAsync(id);
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
