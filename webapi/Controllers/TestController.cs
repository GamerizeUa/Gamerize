using Gamerize.BLL.Models;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.DAL.Entities.Shop;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TestController : ControllerBase
	{
		private readonly IService<Product, ProductFullDTO> _service;
		public TestController(IService<Product, ProductFullDTO> service)
		{
			_service = service;
		}

		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status500InternalServerError)]
		public async Task<ActionResult<ICollection<ProductFullDTO>>> Get()
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
	}
}
