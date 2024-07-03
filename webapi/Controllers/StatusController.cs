using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.Common.Extensions.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly StatusService _service;
        public StatusController(StatusService service) => _service = service;

        [HttpGet("GetAll")]
        public async Task<ActionResult<ICollection<StatusDTO>>> GetAllAsync()
        {
            try
            {
                return Ok(await _service.GetAllAsync());
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("GetById/{id:int}")]
        public async Task<ActionResult<StatusDTO>> GetByIdAsync(int id)
        {
            try
            {
                return Ok(await _service.GetByIdAsync(id));
            }
            catch (InvalidIdException ex)
            {
                return StatusCode(404, ex.Message);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("Create")]
        public async Task<ActionResult<StatusDTO>> CreateAsync([FromBody] StatusDTO newEntity)
        {
            try
            {
                return (!ModelState.IsValid) ?
                        BadRequest() :
                        Ok(await _service.CreateAsync(newEntity));
            }
            catch (DuplicateItemException ex)
            {
                return StatusCode(400, ex.Message);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPatch("Update")]
        public async Task<ActionResult<StatusDTO>> UpdateAsync([FromBody] StatusDTO update)
        {
            try
            {
                return (!ModelState.IsValid) ?
                    BadRequest() :
                    Ok(await _service.UpdateAsync(update));
            }
            catch (InvalidIdException ex)
            {
                return StatusCode(400, ex.Message);
            }
            catch (DuplicateItemException ex)
            {
                return StatusCode(400, ex.Message);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete("Delete/{id:int}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return NoContent();
            }
            catch (InvalidIdException ex)
            {
                return StatusCode(400, ex.Message);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
