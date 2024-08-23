using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Admin;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Migrations;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
    public class OrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Order> _repository;
        private readonly IRepository<OrderStatus> _orderStatusRepository;
        private readonly IRepository<OrderItem> _orderItemRepository;
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<DiscountCoupon> _couponRepository;
        private readonly IRepository<Product> _productRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<DAL.Entities.Admin.User> _userManager;
        private readonly IEmailSender _emailSender;

        public OrderService(IUnitOfWork unitOfWork, IRepository<Order> repository, IRepository<User> userRepository, 
            IRepository<DiscountCoupon> couponRepository, IRepository<Product> productRepository, IMapper mapper, 
            IRepository<OrderItem> orderItemRepository, UserManager<User> userManager, IEmailSender emailSender, IRepository<OrderStatus> orderStatusRepository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
            _userRepository = userRepository;
            _couponRepository = couponRepository;
            _productRepository = productRepository;
            _mapper = mapper;
            _orderItemRepository = orderItemRepository;
            _userManager = userManager;
            _emailSender = emailSender;
            _orderStatusRepository = orderStatusRepository;
        }

        public async Task<ICollection<OrderDTO>> GetOrders()
        {
            try
            {
                var orders = await _repository.Get()
                    .Include(x => x.User)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Language)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Category)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Genre)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Theme)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Puzzle)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.MindGames)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Tags)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Feedbacks)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Images)
                    .Include(x => x.Status)
                    .Include(x => x.PaymentMethod)
                    .Include(x => x.DeliveryMethod)
                    .ToListAsync();

                return _mapper.Map<ICollection<OrderDTO>>(orders);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<OrderDTO> GetByIdAsync(int id)
        {
            try
            {
                var order = await _repository.Get()
                    .Where(o => o.Id == id)
                    .Include(o => o.User)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Language)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Category)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Genre)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Theme)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Puzzle)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.MindGames)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Tags)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Feedbacks)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Images)
                    .Include(o => o.Status)
                    .Include(x => x.PaymentMethod)
                    .Include(x => x.DeliveryMethod)
                    .FirstOrDefaultAsync();

                if (order == null)
                {
                    throw new InvalidIdException(ExceptionMessage(id));
                }

                return _mapper.Map<OrderDTO>(order);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<ICollection<OrderDTO>> GetByUserIdAsync(int userId)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId.ToString());

                if (user == null)
                {
                    throw new Exception("User not found");
                }

                var orders = await _repository.Get()
                    .Where(o => o.UserId == userId)
                    .Include(x => x.User)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Language)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Category)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Genre)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Theme)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Puzzle)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.MindGames)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Tags)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Feedbacks)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                            .ThenInclude(p => p.Images)
                    .Include(x => x.Status)
                    .Include(x => x.PaymentMethod)
                    .Include(x => x.DeliveryMethod)
                    .ToListAsync();

                if (orders == null || !orders.Any())
                {
                    throw new Exception("User has no orders");
                }

                return _mapper.Map<ICollection<OrderDTO>>(orders);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<OrderDTO> CreateOrderAsync(OrderDTO createOrderDTO)
        {
            try
            {
                UnregisteredUserDTO userDTO = null;
                if (createOrderDTO.UserId.HasValue && createOrderDTO.UserId.Value != 0)
                {
                    var user = await _userManager.FindByIdAsync(createOrderDTO.UserId.Value.ToString());
                    if (user != null)
                    {
                        userDTO = new UnregisteredUserDTO
                        {
                            Name = user.Name,
                            PhoneNumber = user.PhoneNumber,
                            City = user.City,
                            DeliveryAddress = user.DeliveryAddress,
                            Email = user.Email
                        };
                    }
                }
                else
                {
                    userDTO = createOrderDTO.User ?? throw new Exception("User information is required for unregistered users.");
                }

                var order = new Order
                {
                    UserId = createOrderDTO.UserId.HasValue && createOrderDTO.UserId.Value != 0 ? createOrderDTO.UserId : null,
                    DeliveryMethodId = createOrderDTO.DeliveryMethodId,
                    PaymentMethodId = createOrderDTO.PaymentMethodId,
                    Comment = createOrderDTO.Comment,
                    TotalPrice = 0,
                    CreatedAt = createOrderDTO.CreatedAt,
                    OrderStatusId = 1,
                    DiscountCouponId = createOrderDTO.DiscountCouponId.HasValue && createOrderDTO.DiscountCouponId.Value != 0 ? createOrderDTO.DiscountCouponId : null
                };

                await _repository.AddAsync(order);
                await _unitOfWork.SaveChangesAsync();

                order.OrderItems = new List<OrderItem>();
                decimal totalPrice = 0;

                foreach (var item in createOrderDTO.OrderItems)
                {
                    var product = await _productRepository.GetByIdAsync(item.ProductId);
                    if (product == null)
                    {
                        throw new Exception($"Product with ID {item.ProductId} not found.");
                    }

                    var orderItem = new OrderItem
                    {
                        OrderId = order.Id,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        UnitPrice = product.Price
                    };

                    totalPrice += orderItem.UnitPrice * orderItem.Quantity;
                    await _orderItemRepository.AddAsync(orderItem);
                    order.OrderItems.Add(orderItem);
                }

                if (createOrderDTO.DiscountCouponId.HasValue)
                {
                    var discountCoupon = await _couponRepository.GetByIdAsync(createOrderDTO.DiscountCouponId.Value);
                    if (discountCoupon != null)
                    {
                        if (discountCoupon.ActiveFrom <= DateTime.Now && (!discountCoupon.ActiveTo.HasValue || discountCoupon.ActiveTo.Value >= DateTime.Now))
                        {
                            var discountAmount = totalPrice * (decimal)discountCoupon.Discount / 100;
                            totalPrice -= discountAmount;
                        }
                        else
                        {
                            throw new Exception("The discount coupon has expired or is not yet active.");
                        }
                    }
                }

                order.TotalPrice = totalPrice;
                await _unitOfWork.SaveChangesAsync();

                await _repository.LoadRelatedEntities(order);

                var orderDTO = _mapper.Map<OrderDTO>(order);
                orderDTO.User = userDTO;

                orderDTO.OrderItems = orderDTO.OrderItems.GroupBy(item => item.Id)
                                                         .Select(group => group.First())
                                                         .ToList();

                return orderDTO;
            }
            catch (DbUpdateException ex)
            {
                var innerException = ex.InnerException != null ? ex.InnerException.Message : "No inner exception";
                throw new ServerErrorException($"An error occurred while saving the entity changes: {ex.Message}, Inner exception: {innerException}", ex);
            }
            catch (Exception ex)
            {
                throw new ServerErrorException($"An unexpected error occurred: {ex.Message}", ex);
            }
        }

        public async Task UpdateOrderStatusAsync(int orderId, int newStatusId)
        {
            try
            {
                var order = await _repository.Get()
                    .Include(o => o.User)   
                    .Include(o => o.Status)
                    .FirstOrDefaultAsync(o => o.Id == orderId);

                if (order == null)
                {
                    throw new Exception($"Order with ID {orderId} not found.");
                }

                var orderDTO = _mapper.Map<OrderDTO>(order);
                
                if (order.OrderStatusId == newStatusId)
                {
                    throw new Exception("The new status must be different from the current status.");
                }

                order.OrderStatusId = newStatusId;
                var newStatus = await _orderStatusRepository.GetByIdAsync(order.OrderStatusId);

                await _unitOfWork.SaveChangesAsync();
                await _emailSender.SendEmailAsync(
                    orderDTO.User.Email,
                    "Зміна статусу замовлення",
                    $"Вітаємо, шановний {orderDTO.User.Name}! Хочемо повідомити, що статус вашого замовлення успішно змінено!<br/><br/>" +
                    $"Тепер ваш статус замовлення:<br/>" +
                    $"<strong>{newStatus.Status}</strong><br/><br/>" +
                    $"Попередній статус замовлення:<br/>" +
                    $"<strong>{orderDTO.Status.Status}</strong>"
                );
            }
            catch (DbUpdateException ex)
            {
                var innerException = ex.InnerException != null ? ex.InnerException.Message : "No inner exception";
                throw new ServerErrorException($"An error occurred while saving the entity changes: {ex.Message}, Inner exception: {innerException}", ex);
            }
            catch (Exception ex)
            {
                throw new ServerErrorException($"An unexpected error occurred: {ex.Message}", ex);
            }
        }

        private string ExceptionMessage(object? value = null) =>
            value switch
            {
                int idt when value is int => $"Замовлення з id: {idt} ще/вже не існує!",
                string namet when value is string => $"Замовлення з назвою {namet} вже існує",
                _ => "Something has gone wrong"
            };
    }
}