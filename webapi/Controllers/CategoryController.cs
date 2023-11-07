using Gamerize.BLL.Services;
using Gamerize.DAL.Entities.Shop;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class CategoryController : ControllerBase
	{
		private readonly ShopService _shopService;

		public CategoryController(ShopService shopService)
		{
			_shopService = shopService;
		}

		[HttpGet]
		public async Task<ActionResult<ICollection<Category>>> Get()
		{
			return Ok(await _shopService.GetCategoriesAsync());
		}
	}
}
