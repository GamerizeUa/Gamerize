using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.Common.Extensions.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
        public async Task<ActionResult<ICollection<OrderDTO>>> GetAllAsync(int totalOrder = 10, int page = 1)
        {
            try
            {
                var (orders, totalPages, currentPage, totalOrders) = await _orderService.GetOrders(totalOrder, page);

                var result = new
                {
                    Orders = orders,
                    TotalPages = totalPages,
                    Page = page,
                    TotalOrders = totalOrders
                };

                return Ok(result);
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
        public async Task<ActionResult<ICollection<OrderDTO>>> GetByUserId(int? statusId, int totalOrder = 10, int page = 1)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null)
                {
                    return BadRequest("User not authenticated");
                }

                var (orders, totalPages, currentPage, totalOrders) = await _orderService.GetByUserIdAsync(statusId, Convert.ToInt32(userId), totalOrder, page);

                var result = new
                {
                    Orders = orders,
                    TotalPages = totalPages,
                    Page = page,
                    TotalOrders = totalOrders
                };

                return Ok(result);
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
        public async Task<ActionResult<OrderDTO>> CreateOrderAsync([FromBody] OrderDTO orderDTO)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (!string.IsNullOrEmpty(userId))
                {
                    orderDTO.UserId = int.Parse(userId);
                }
                else
                {
                    orderDTO.UserId = null;
                }

                var order = await _orderService.CreateOrderAsync(orderDTO);

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

        [HttpGet("GetByStatusAllOrders")]
        public async Task<ActionResult<ICollection<OrderDTO>>> GetByStatusAllOrders(int statusId, int totalOrder = 10, int page = 1)
        {
            try
            {
                var (orders, totalPages, currentPage, totalOrders) = await _orderService.GetByStatusAllOrders(statusId, totalOrder, page);

                var result = new
                {
                    Orders = orders,
                    TotalPages = totalPages,
                    Page = page,
                    TotalOrders = totalOrders
                };

                return Ok(result);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetOrdersWithPagination")]
        public async Task<ActionResult> GetOrdersWithPagination(int totalOrders = 10, int page = 1, bool isDescending = true, 
            DateTime? startDate = null, DateTime? endDate = null, int? statusId = null, string? searchTerm = null)
        {
            try
            {
                var (orders, totalPages, currentPage, totalOrderCount) = await _orderService.GetOrdersWithPaginationAndSearchAsync(totalOrders, page, isDescending, startDate, endDate, statusId, searchTerm);

                var result = new
                {
                    Orders = orders,
                    TotalPages = totalPages,
                    Page = page,
                    TotalOrders = totalOrderCount
                };

                return Ok(result);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("SearchOrders")]
        public async Task<ActionResult<ICollection<OrderDTO>>> SearchOrders(string? searchTerm = null, int totalOrders = 10, int page = 1, int? statusId = null)
        {
            try
            {
                var (orders, totalPages, currentPage, totalOrderCount) = await _orderService.SearchOrdersAsync(searchTerm, totalOrders, page, statusId);

                var result = new
                {
                    Orders = orders,
                    TotalPages = totalPages,
                    Page = page,
                    TotalOrders = totalOrderCount
                };

                return Ok(result);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}