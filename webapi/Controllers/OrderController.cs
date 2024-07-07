using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.Common.Extensions.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<ICollection<OrderDTO>>> GetAllAsync()
        {
            try
            {
                return Ok(await _orderService.GetOrders());
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetByOrderId/{id:int}", Name = "GetById")]
        public async Task<ActionResult<OrderDTO>> GetById(int id)
        {
            try
            {
                var order = await _orderService.GetByIdAsync(id);
                if (order == null)
                {
                    return NotFound();
                }
                return Ok(order);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetByUserId/{id:int}")]
        public async Task<ActionResult<ICollection<OrderDTO>>> GetByUserId(int id)
        {
            try
            {
                var orders = await _orderService.GetByUserIdAsync(id);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                if (ex.Message == "User not found" || ex.Message == "User has no orders")
                {
                    return NotFound(ex.Message);
                }
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Create")]
        public async Task<ActionResult<OrderDTO>> CreateOrderAsync([FromBody] OrderDTO createOrderDTO)
        {
            try
            {
                var order = await _orderService.CreateOrderAsync(createOrderDTO);

                return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("UpdateStatus")]
        public async Task<IActionResult> ChangeOrderStatus(int orderId, int newStatusId)
        {
            try
            {
                await _orderService.UpdateOrderStatusAsync(orderId, newStatusId);
                return Ok(new { message = "Order status updated successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}