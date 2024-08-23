using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.Common.Extensions.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListController : ControllerBase
    {
        private readonly WishListService _wishListService;
        public WishListController(WishListService wishListService)
        {
            _wishListService = wishListService;
        }

        [HttpGet("GetAllItemsFromWishList")]
        public async Task<IActionResult> GetAllItemsFromWishList(int userId, int page = 1, int pageSize = 12)
        {
            try
            {
                var (wishList, totalPages) = await _wishListService.GetAllItemsFromWishList(userId, page, pageSize);
                return Ok(new { WishList = wishList, TotalPages = totalPages });
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("AddProductInWishList")]
        public async Task<IActionResult> AddProductInWishList([FromForm] WishListDTO wishListDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                return Ok(await _wishListService.AddProductInWishList(wishListDTO));
            }
            catch (DuplicateItemException ex)
            {
                return StatusCode(409, ex.Message);
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

        [HttpDelete("RemoveFromWishList")]
        public async Task<IActionResult> RemoveFromWishList(int userId, [FromBody] List<int> ids)
        {
            try
            {
                await _wishListService.RemoveFromWishList(userId, ids);
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
