using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class CategoryController : ControllerBase
	{
		private readonly IRepository<Category> _repository;
        public CategoryController(IRepository<Category> repository)
        {
				_repository = repository;
        }

		[HttpGet]
		public async Task<ActionResult<ICollection<Category>>> Get()
		{
			return Ok(await _repository.GetAllAsync());
		}
    }
}
