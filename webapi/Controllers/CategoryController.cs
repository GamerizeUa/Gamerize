using Gamerize.BLL.Models;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.DAL.Entities.Shop;
using Microsoft.AspNetCore.Mvc;
using webapi.Controllers.Common;

namespace webapi.Controllers
{
    [ApiController]
	[Route("api/[controller]")]
	public class CategoryController : GenericController<Category, CategoryDTO>
	{
		public CategoryController(IService<Category, CategoryDTO> service) : base(service) { }
	}
}
