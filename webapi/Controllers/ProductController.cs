using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.Common.Extensions.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;
        private readonly QuestionService _questionService;
        public ProductController(
            QuestionService questionService,
            ProductService productService)
        {
            _questionService = questionService;
            _productService = productService;
        }

        [HttpGet("GetSimpleList")]
        public async Task<ActionResult<IEnumerable<ProductShortDTO>>> GetSimpleList(int page = 1, int pageSize = 12)
        {
            try
            {
                var products = await _productService.GetSimpleListAsync(page, pageSize);
                return Ok(products);
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
    }
}