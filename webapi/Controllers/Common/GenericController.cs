using Gamerize.BLL.Models.Interfaces;
using Gamerize.BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers.Common
{
	public class GenericController<TInput, TOutput> : ControllerBase
		where TInput : class
		where TOutput : class, IEntity
	{
		public IService<TInput, TOutput> _service { get; init; }
		public GenericController(IService<TInput, TOutput> service) => _service = service;

		[HttpGet("GetAll")]
		public virtual async Task<ActionResult<ICollection<TOutput>>> Get()
		{
			try
			{
				return Ok(await _service.GetAllAsync());
			}
			catch
			{
				return StatusCode(500, "Internal Server Error. Please try again later.");
			}
		}

		[HttpGet("GetById/{id:int}")]
		public async Task<ActionResult<TOutput>> GetById(int id)
		{
			try
			{
				return Ok(await _service.GetByIdAsync(id));
			}
			catch
			{
				return StatusCode(500, "Internal Server Error. Please try again later.");
			}
		}

		[HttpPost("Create")]
		public virtual async Task<IActionResult> Create([FromBody] TOutput entity)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest();
				entity.Id = default;
				await _service.CreateAsync(entity);
				return NoContent();
			}
			catch
			{
				return StatusCode(500, "Internal Server Error. Please try again later.");
			}
		}

		[HttpPatch("Update")]
		public async Task<ActionResult<ICollection<TOutput>>> Update([FromBody] TOutput entity)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest();
				await _service.UpdateAsync(entity, entity.Id);
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
				await _service.DeleteAsync(id);
				return NoContent();
			}
			catch (ArgumentException ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
