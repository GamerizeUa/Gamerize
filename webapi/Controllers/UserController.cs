using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.Common.Extensions.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<ICollection<ProfileDTO>>> GetAllAsync()
        {
            try
            {
                return Ok(await _userService.GetUserAsync());
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetById/{id:int}")]
        public async Task<ActionResult<ProfileDTO>> GetByIdAsync(int id)
        {
            try
            {
                return Ok(await _userService.GetUserByIdAsync(id));
            }
            catch(InvalidIdException ex)
            {
                return StatusCode(404, ex.Message);
            }
            catch(ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
