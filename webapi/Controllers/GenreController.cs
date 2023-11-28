using Gamerize.BLL.Models;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.DAL.Entities.Shop;
using Microsoft.AspNetCore.Mvc;
using webapi.Controllers.Common;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class GenreController : GenericController<Genre, GenreDTO>
	{
		public GenreController(IService<Genre, GenreDTO> service) : base(service) { }
	}
}
