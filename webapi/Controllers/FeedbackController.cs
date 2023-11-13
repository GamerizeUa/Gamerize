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


        [HttpGet("GetAllFeedbacks")]
		public async Task<ActionResult<ICollection<FeedbackDTO>>> GetAllFeedbacks()
		{
			return Ok(await _shopService.GetFeedbacksAsync());
		}
		[HttpGet("GetFeedbacksByProductId/{id}")]
		public async Task<ActionResult<ICollection<FeedbackDTO>>> GetFeedbacksByProductId(int id)
		{
			return Ok(await _shopService.GetFeedbacksByProductId(id));
		}
		[HttpGet("GetFeedbackById")]
		public async Task<ActionResult<FeedbackDTO>> GetFeedbackById(int id)
		{
			try
			{
				return Ok(await _shopService.GetFeedbackByIdAsync(id));
			}
			catch(ArgumentException ex)
			{
				return BadRequest(ex.Message);
			}
		}
		[HttpPut("UpdateFeedback")]
		public async Task<IActionResult> UpdateFeedback([FromBody] FeedbackDTO feedbackDTO)
		{
			return await _shopService.UpdateFeedbackAsync(feedbackDTO) ? NoContent() : BadRequest();
		}
		[HttpDelete("DeleteFeedback/{id}")]
		public async Task<IActionResult> DeleteFeedback(int id)
		{
			return await _shopService.DeleteFeedbackAsync(id) ? NoContent() : BadRequest();
		}
	}
}
