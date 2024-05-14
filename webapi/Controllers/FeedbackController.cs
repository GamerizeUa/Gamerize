using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.Common.Extensions.Exceptions;
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
        public async Task<ActionResult<IEnumerable<FeedbackDTO>>> GetFeedbacksByProductId(int id, int page = 1, int pageSize = 3)
        {
            try
            {
                var feedbacks = await _service.FindAsync(f => f.Product.Id == id);
                var feedbacksPage = feedbacks.Skip((page - 1) * pageSize)
                                             .Take(pageSize)
                                             .ToList();
                var totalFeedbacksCount = feedbacks.Count();

                return Ok(new { feedbacks = feedbacksPage, totalPages = (totalFeedbacksCount + pageSize - 1) / pageSize });
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
