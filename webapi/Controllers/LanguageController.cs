using Gamerize.BLL.Models;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.DAL.Entities.Shop;
using Microsoft.AspNetCore.Mvc;
using webapi.Controllers.Common;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class LanguageController : GenericController<Language, LanguageDTO>
	{
        public LanguageController(IService<Language, LanguageDTO> service) : base(service) { }
    }
}
