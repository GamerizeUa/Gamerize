using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	public class GenreController : ControllerBase
	{
		private readonly ShopService _shopService;

		public GenreController(ShopService shopService)
        {
			_shopService = shopService;
		}

		[HttpGet("GetAll")]
		public async Task<ActionResult<ICollection<GenreDTO>>> GetAll()
		{
			return Ok();
		}
    }
}
