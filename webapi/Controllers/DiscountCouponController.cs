using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.Common.Extensions.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DiscountCouponController : ControllerBase
	{
		private readonly DiscountCouponService _service;

		public DiscountCouponController(DiscountCouponService service) => _service = service;

		[HttpGet("GetAll")]
		public async Task<ActionResult<ICollection<DiscountCouponDTO>>> Get()
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
		public async Task<ActionResult<DiscountCouponDTO>> GetByIdAsync(int id)
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
		public async Task<ActionResult<DiscountCouponDTO>> CreateAsync([FromBody] DiscountCouponDTO newCategory)
		{
			try
			{
				return (!ModelState.IsValid) ? BadRequest() : Ok(await _service.CreateAsync(newCategory));
			}
			catch (DuplicateItemException ex)
			{
				return StatusCode(400, ex.Message);
			}
			catch (InvalidOperationException ex)
			{
				return StatusCode(400, ex.Message);
			}
			catch (ServerErrorException ex)
			{
				return StatusCode(500, ex.Message);
			}
		}

		[HttpPatch("Update")]
		public async Task<ActionResult<DiscountCouponDTO>> UpdateAsync([FromBody] DiscountCouponDTO updateCategory)
		{
			try
			{
				return (!ModelState.IsValid) ? BadRequest() : Ok(await _service.UpdateAsync(updateCategory));
			}
			catch (InvalidIdException ex)
			{
				return StatusCode(400, ex.Message);
			}
			catch (DuplicateItemException ex)
			{
				return StatusCode(400, ex.Message);
			}
			catch (InvalidOperationException ex)
			{
				return StatusCode(400, ex.Message);
			}
			catch (ServerErrorException ex)
			{
				return StatusCode(500, ex.Message);
			}
		}

		[HttpDelete("Delete/{id:int}")]
		public async Task<IActionResult> DeleteAsync(int id)
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

