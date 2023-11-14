using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.DAL.Entities.Shop;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class FeedbackController : ControllerBase
	{
		private readonly ShopService _shopService;

		public FeedbackController(ShopService shopService)
		{
			_shopService = shopService;
		}


		[HttpGet("GetAll")]
		public async Task<ActionResult<ICollection<FeedbackDTO>>> GetAllFeedbacks()
		{
			return Ok(await _shopService.GetFeedbacksAsync());
		}
		[HttpGet("GetAllByProductId")]
		public async Task<ActionResult<ICollection<FeedbackDTO>>> GetFeedbacksByProductId([FromQuery] int id)
		{
			return Ok(await _shopService.GetFeedbacksByProductId(id));
		}
		[HttpGet("GetById")]
		public async Task<ActionResult<FeedbackDTO>> GetFeedbackById([FromQuery] int id)
		{
			try
			{
				return Ok(await _shopService.GetFeedbackByIdAsync(id));
			}
			catch (ArgumentException ex)
			{
				return BadRequest(ex.Message);
			}
		}
		[HttpPost("Create")]
		public async Task<ActionResult<ICollection<FeedbackDTO>>> Create([FromBody] FeedbackDTO feedbackDTO)
		{
			return (ModelState.IsValid && await _shopService.AddFeedbackAsync(feedbackDTO)) ? Ok(await _shopService.GetFeedbacksAsync()) : BadRequest();
		}
		[HttpPut("Update")]
		public async Task<ActionResult<ICollection<FeedbackDTO>>> UpdateFeedback([FromBody] FeedbackDTO feedbackDTO)
		{
			return (ModelState.IsValid && await _shopService.UpdateFeedbackAsync(feedbackDTO)) ? Ok(await _shopService.GetFeedbacksAsync()) : BadRequest();
		}
		[HttpDelete("Delete")]
		public async Task<IActionResult> DeleteFeedback([FromQuery] int id)
		{
			return await _shopService.DeleteFeedbackAsync(id) ? NoContent() : BadRequest();
		}
	}
}
