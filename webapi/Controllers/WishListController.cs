using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.Common.Extensions.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
        public async Task<IActionResult> GetAlItemsFromWishList(int page = 1, int pageSize = 12)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null)
                {
                    return BadRequest("User not authenticated");
                }

                var (wishList, totalPages, currentPage) = await _wishListService.GetAllItemsFromWishList(userId, page, pageSize);
                return Ok(new { WishList = wishList, TotalPages = totalPages, CurrentPage = currentPage });
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("AddProductInWishList")]
        public async Task<IActionResult> AddProductInWishList([FromForm] WishListSimpleDTO wishListDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null)
                {
                    return BadRequest("User not authenticated");
                }

                return Ok(await _wishListService.AddProductInWishList(userId, wishListDTO));
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
        public async Task<IActionResult> RemoveFromWishList([FromBody] List<int> ids)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null)
                {
                    return BadRequest("User not authenticated");
                }

                await _wishListService.RemoveFromWishList(Convert.ToInt32(userId), ids);
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

        [HttpGet("OnlyProductId")]
        public async Task<IActionResult> GetOnlyIdFromWishList()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null)
                {
                    return BadRequest("User not authenticated");
                }

                return Ok(await _wishListService.GetOnlyProductIdFromWishList(userId));
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            } 
        }
    }
}