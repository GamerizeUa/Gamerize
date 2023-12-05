using Gamerize.BLL.Models;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.DAL.Entities.Shop;
using Microsoft.AspNetCore.Mvc;
using webapi.Controllers.Common;

namespace webapi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class FeedbackController : GenericController<Feedback, FeedbackDTO>
	{
		public FeedbackController(IService<Feedback, FeedbackDTO> service) : base(service) { }

		[HttpGet("GetAllByProduct/{id:int}")]
		public async Task<ActionResult<ICollection<FeedbackDTO>>> GetFeedbacksByProductId(int id)
		{
			return Ok(await _service.FindAsync(f => f.Product.Id == id));
		}
	}
}
