using Gamerize.BLL.Models;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.DAL.Entities.Shop;
using Microsoft.AspNetCore.Mvc;
using webapi.Controllers.Common;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class DiscountController : GenericController<Discount, DiscountDTO>
	{
		public DiscountController(IService<Discount, DiscountDTO> service) : base(service) { }

		//TODO In create and update method added InvalidOperationException
		[HttpGet("GetAllByProduct/{id:int}")]
		public async Task<ActionResult<ICollection<DiscountDTO>>> GetByProduct(int id)
		{
			return Ok((await _service.FindAsync(f => f.ProductId == id)).FirstOrDefault());
		}
	}
}
