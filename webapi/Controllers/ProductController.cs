using Gamerize.BLL.Models;
using Gamerize.BLL.Models.Requests;
using Gamerize.BLL.Services;
using Gamerize.Common.Extensions.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;
        public ProductController(
            ProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("GetSimpleList")]
        public async Task<IActionResult> GetAllProducts([FromBody] ProductListFilterRequest filterRequest, int page = 1, int pageSize = 12)
        {
            try
            {
                var (products, totalPages) = await _productService.GetFilteredProductsAsync(filterRequest, page, pageSize);
                return Ok(new { Products = products, TotalPages = totalPages });
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetById/{id:int}")]
        public async Task<ActionResult<ProductFullDTO>> GetById(int id)
        {
            try
            {
                return Ok(await _productService.GetByIdAsync(id));
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

        [HttpPost("AddRate")]
        [Authorize]
        public async Task<ActionResult<RatingDTO>> AddRate([FromBody] RatingDTO ratingDTO)
        {
            if (ratingDTO.Rate < 0 || ratingDTO.Rate > 5)
            {
                return BadRequest("Rating should be between 0 and 5.");
            }

            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim))
                {
                    return Unauthorized("User is not authorized.");
                }

                if (!int.TryParse(userIdClaim, out var userId))
                {
                    return NotFound("User not found.");
                }

                return Ok(await _productService.CreateRate(ratingDTO, userId));
            }
            catch (InvalidIdException ex)
            {
                return StatusCode(404, ex.Message);
            }
            catch (DuplicateItemException ex)
            {
                return StatusCode(409, ex.Message);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetPopularProducts")]
        public async Task<IActionResult> GetPopularProducts(int count = 10)
        {
            try
            {
                var products = await _productService.GetPopularProductsAsync(count);
                return Ok(products);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetProductsWithBiggestDiscount")]
        public async Task<IActionResult> GetProductsWithBiggestDiscount(int count = 10)
        {
            try
            {
                var products = await _productService.GetProductsWithBiggestDiscountAsync(count);
                return Ok(products);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromForm] ProductNewDTO newProduct)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                return Ok(await _productService.CreateAsync(newProduct));
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

        [HttpDelete("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _productService.DeleteAsync(id);
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
        [HttpPut("Update/{id:int}")]
        public async Task<IActionResult> Update(int id, [FromForm] ProductNewDTO updatedProduct)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedEntity = await _productService.UpdateAsync(id, updatedProduct);
                return Ok(updatedEntity);
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