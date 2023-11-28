using Gamerize.BLL.Models;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.DAL.Entities.Shop;
using Microsoft.AspNetCore.Mvc;
using webapi.Controllers.Common;

namespace webapi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DiscountCouponController : GenericController<DiscountCoupon, DiscountCouponDTO>
	{
		public DiscountCouponController(IService<DiscountCoupon, DiscountCouponDTO> service) : base(service) { }
	}
}
