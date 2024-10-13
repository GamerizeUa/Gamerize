using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Admin;
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
        private readonly IRepository<UnregisteredUser> _unregisterUserRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<DAL.Entities.Admin.User> _userManager;
        private readonly IEmailSender _emailSender;

        public OrderService(IUnitOfWork unitOfWork, IRepository<Order> repository, IMapper mapper, IRepository<UnregisteredUser> unregisterUserRepository,
            UserManager<User> userManager, IEmailSender emailSender, IRepository<OrderStatus> orderStatusRepository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
            _mapper = mapper;
            _userManager = userManager;
            _emailSender = emailSender;
            _orderStatusRepository = orderStatusRepository;
            _unregisterUserRepository = unregisterUserRepository;
        }

        public async Task<(ICollection<OrderDTO>, int totalPages, int CurrentPage, int totalOrders)> GetOrders(int totalOrders, int page)
        {
            try
            {
                var orders = await _repository.Get()
                    .Include(o => o.UnregisteredUser)
                    .Include(o => o.Status)
                    .Include(o => o.DeliveryMethod)
                    .Include(o => o.PaymentMethod)
                    .OrderByDescending(o => o.CreatedAt)
                    .ToListAsync();

                var totalCount = orders.Count;
                var totalPages = (int)Math.Ceiling((double)totalCount / totalOrders);

                var paginatedOrders = orders
                    .Skip((page - 1) * totalOrders)
                    .Take(totalOrders)
                    .ToList();

                return (_mapper.Map<ICollection<OrderDTO>>(paginatedOrders), totalPages, page, totalCount);
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
                    .Include(o => o.UnregisteredUser)
                    .Include(o => o.Status)
                    .Include(o => o.DeliveryMethod)
                    .Include(o => o.PaymentMethod)
                    .OrderByDescending(o => o.CreatedAt)
                    .FirstOrDefaultAsync(o => o.Id == id);

                if (order == null)
                {
                    throw new InvalidIdException($"Order with ID {id} not found.");
                }

                return _mapper.Map<OrderDTO>(order);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<(ICollection<OrderDTO>, int totalPages, int currentPage, int totalOrders)> GetByUserIdAsync(int? statusId, int userId, int totalOrders, int page)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId.ToString());
                if (user == null)
                {
                    throw new InvalidIdException($"User with ID {userId} not found.");
                }

                // Отримуємо всі замовлення користувача
                var orders = await _repository.Get()
                    .Where(o => o.UserId == userId)
                    .Include(o => o.UnregisteredUser)
                    .Include(o => o.Status)
                    .Include(o => o.DeliveryMethod)
                    .Include(o => o.PaymentMethod)
                    .ToListAsync();  // Витягуємо всі дані

                if (orders.Count == 0)
                {
                    throw new Exception("User has no orders.");
                }

                // Фільтруємо за статусом
                if (statusId.HasValue)
                {
                    if (statusId == 1 || statusId == 3 || statusId == 4)
                    {
                        orders = orders.Where(o => o.OrderStatusId == statusId.Value).ToList();
                    }
                }

                // Сортуємо за датою створення
                orders = orders.OrderByDescending(o => o.CreatedAt).ToList();

                // Підраховуємо кількість сторінок
                var totalCount = orders.Count;
                var totalPages = (int)Math.Ceiling((double)totalCount / totalOrders);

                // Пагінація
                var paginatedOrders = orders
                    .Skip((page - 1) * totalOrders)
                    .Take(totalOrders)
                    .ToList();

                return (_mapper.Map<ICollection<OrderDTO>>(paginatedOrders), totalPages, page, totalCount);
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
                ValidateUnregisteredUser(createOrderDTO.UnregisteredUser, createOrderDTO.DeliveryMethodId);

                var unregisteredUserEntity = new UnregisteredUser
                {
                    Name = createOrderDTO.UnregisteredUser.Name,
                    PhoneNumber = createOrderDTO.UnregisteredUser.PhoneNumber,
                    City = createOrderDTO.UnregisteredUser.City,
                    DeliveryAddress = createOrderDTO.UnregisteredUser.DeliveryAddress,
                    Email = createOrderDTO.UnregisteredUser.Email
                };

                await _unregisterUserRepository.AddAsync(unregisteredUserEntity);
                await _unitOfWork.SaveChangesAsync();

                var order = new Order
                {
                    UserId = createOrderDTO.UserId,
                    DeliveryMethodId = createOrderDTO.DeliveryMethodId,
                    PaymentMethodId = createOrderDTO.PaymentMethodId,
                    Comment = createOrderDTO.Comment,
                    TotalPrice = createOrderDTO.TotalPrice,
                    TotalDiscount = createOrderDTO.TotalDiscount,
                    CreatedAt = DateTime.UtcNow.ToLocalTime(),
                    OrderStatusId = 1,
                    ProductId = createOrderDTO.ProductId,
                    Quantity = createOrderDTO.Quantity,
                    DiscountCouponId = createOrderDTO.DiscountCouponId,
                    UnregisteredUserId = unregisteredUserEntity.Id
                };

                await _repository.AddAsync(order);
                await _unitOfWork.SaveChangesAsync();

                var orderWithUser = await _repository.Get()
                    .Include(o => o.UnregisteredUser)
                    .Include(o => o.Status)
                    .Include(o => o.DeliveryMethod)
                    .Include(o => o.PaymentMethod)
                    .FirstOrDefaultAsync(o => o.Id == order.Id);

                if (orderWithUser == null)
                {
                    throw new Exception("Order was not created successfully.");
                }

                return _mapper.Map<OrderDTO>(orderWithUser);
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

        private void ValidateUnregisteredUser(UnregisteredUserDTO unregisteredUser, int deliveryMethodId)
        {
            if (unregisteredUser == null)
            {
                throw new Exception("User information is required.");
            }

            if (deliveryMethodId == 2)
            {
                if (string.IsNullOrEmpty(unregisteredUser.Name) ||
                    string.IsNullOrEmpty(unregisteredUser.PhoneNumber) ||
                    string.IsNullOrEmpty(unregisteredUser.City) ||
                    string.IsNullOrEmpty(unregisteredUser.DeliveryAddress) ||
                    string.IsNullOrEmpty(unregisteredUser.Email))
                {
                    throw new Exception("All fields for unregistered user must be filled for this delivery method.");
                }
            }
            else if (deliveryMethodId == 1)
            {
                if (string.IsNullOrEmpty(unregisteredUser.Name) ||
                    string.IsNullOrEmpty(unregisteredUser.PhoneNumber) ||
                    string.IsNullOrEmpty(unregisteredUser.Email))
                {
                    throw new Exception("Name, PhoneNumber, and Email must be filled for this delivery method.");
                }
            }
            else
            {
                throw new Exception("Invalid delivery method.");
            }
        }

        public async Task UpdateOrderStatusAsync(int orderId, int newStatusId)
        {
            try
            {
                var order = await _repository.Get()
                    .Include(o => o.UnregisteredUser)
                    .Include(o => o.Status)
                    .Include(o => o.DeliveryMethod)
                    .Include(o => o.PaymentMethod)
                    .FirstOrDefaultAsync(o => o.Id == orderId);

                if (order == null)
                {
                    throw new Exception($"Order with ID {orderId} not found.");
                }

                var currentStatusId = order.OrderStatusId;

                if (currentStatusId == newStatusId)
                {
                    throw new Exception("The new status must be different from the current status.");
                }

                var currentStatus = await _orderStatusRepository.GetByIdAsync(currentStatusId);
                var newStatus = await _orderStatusRepository.GetByIdAsync(newStatusId);

                order.OrderStatusId = newStatusId;

                if (newStatusId == 3)
                {
                    order.UpdatedAd = DateTime.UtcNow.ToLocalTime();
                }

                if (newStatusId == 4)
                {
                    order.ClosedAt = DateTime.UtcNow.ToLocalTime();
                }

                await _unitOfWork.SaveChangesAsync();

                var orderDTO = _mapper.Map<OrderDTO>(order);

                await _emailSender.SendEmailAsync(
                    orderDTO.UnregisteredUser.Email,
                    "Зміна статусу замовлення",
                    $"Вітаємо, шановний Клієнт! Хочемо повідомити, що статус вашого замовлення успішно змінено!<br/><br/>" +
                    $"Тепер ваш статус замовлення:<br/>" +
                    $"<strong>{newStatus.Status}</strong><br/><br/>" +
                    $"Попередній статус замовлення:<br/>" +
                    $"<strong>{currentStatus.Status}</strong>"
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

        public async Task<(ICollection<OrderDTO>, int totalPages, int CurrentPage, int totalOrders)> GetByStatusAllOrders(int statusId, int totalOrders, int page)
        {
            try
            {
                var orders = await _repository.Get()
                    .Where(x => x.OrderStatusId == statusId)
                    .Include(o => o.UnregisteredUser)
                    .Include(o => o.Status)
                    .Include(o => o.DeliveryMethod)
                    .Include(o => o.PaymentMethod)
                    .OrderByDescending(o => o.CreatedAt)
                    .ToListAsync();

                if (!orders.Any())
                {
                    throw new Exception($"No orders found for status ID {statusId}.");
                }

                var totalCount = orders.Count;
                var totalPages = (int)Math.Ceiling((double)totalCount / totalOrders);

                var paginatedOrders = orders
                    .Skip((page - 1) * totalOrders)
                    .Take(totalOrders)
                    .ToList();

                return (_mapper.Map<ICollection<OrderDTO>>(paginatedOrders), totalPages, page, totalCount);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<(ICollection<OrderDTO>, int totalPages, int currentPage, int totalOrders)> SearchOrdersAsync(
    string? searchTerm = null, int totalOrders = 10, int page = 1, int? statusId = null)
        {
            try
            {
                var query = _repository.Get().AsQueryable();

                if (!string.IsNullOrWhiteSpace(searchTerm))
                {
                    if (Int32.TryParse(searchTerm, out var orderId))
                    {
                        query = query.Where(o => o.Id == orderId);
                    }
                    else
                    {
                        query = query.Where(o => o.UnregisteredUser.Name.Contains(searchTerm) ||
                                                 (o.UnregisteredUser != null && o.UnregisteredUser.Name.Contains(searchTerm)));
                    }
                }

                if (statusId.HasValue)
                {
                    query = query.Where(o => o.OrderStatusId == statusId.Value);
                }

                var totalCount = await query.CountAsync();

                if (totalCount == 0)
                {
                    throw new Exception("No orders found matching the criteria.");
                }

                var totalPages = (int)Math.Ceiling((double)totalCount / totalOrders);

                var paginatedOrders = await query
                    .Skip((page - 1) * totalOrders)
                    .Take(totalOrders)
                    .Include(o => o.UnregisteredUser)
                    .Include(o => o.Status)
                    .Include(o => o.DeliveryMethod)
                    .Include(o => o.PaymentMethod)
                    .OrderByDescending(o => o.CreatedAt)
                    .ToListAsync();

                return (_mapper.Map<ICollection<OrderDTO>>(paginatedOrders), totalPages, page, totalCount);
            }
            catch (Exception ex)
            {
                throw new ServerErrorException($"An unexpected error occurred: {ex.Message}", ex);
            }
        }

        public async Task<(ICollection<OrderDTO>, int totalPages, int currentPage, int totalOrders)> GetOrdersWithPaginationAndSearchAsync(
    int totalOrders, int page, bool isDescending = true, DateTime? startDate = null, DateTime? endDate = null,
    int? statusId = null, string? searchTerm = null)
        {
            try
            {
                var query = _repository.Get().AsQueryable();

                if (startDate.HasValue && endDate.HasValue)
                {
                    var start = startDate.Value.Date;
                    var end = endDate.Value.Date.AddDays(1).AddTicks(-1);
                    query = query.Where(o => o.CreatedAt >= start && o.CreatedAt <= end);
                }

                if (statusId.HasValue)
                {
                    query = query.Where(o => o.OrderStatusId == statusId.Value);
                }

                if (!string.IsNullOrWhiteSpace(searchTerm))
                {
                    if (Int32.TryParse(searchTerm, out var orderId))
                    {
                        query = query.Where(o => o.Id == orderId);
                    }
                    else
                    {
                        query = query.Where(o => o.UnregisteredUser.Name.Contains(searchTerm) ||
                                                 (o.UnregisteredUser != null && o.UnregisteredUser.Name.Contains(searchTerm)));
                    }
                }

                query = isDescending ? query.OrderByDescending(o => o.CreatedAt) : query.OrderBy(o => o.CreatedAt);

                var totalCount = await query.CountAsync();
                var totalPages = (int)Math.Ceiling((double)totalCount / totalOrders);

                var paginatedOrders = await query
                    .Skip((page - 1) * totalOrders)
                    .Take(totalOrders)
                    .Include(o => o.UnregisteredUser)
                    .Include(o => o.Status)
                    .Include(o => o.DeliveryMethod)
                    .Include(o => o.PaymentMethod)
                    .OrderByDescending(o => o.CreatedAt)
                    .ToListAsync();

                if (!paginatedOrders.Any())
                {
                    throw new Exception("No orders found.");
                }

                return (_mapper.Map<ICollection<OrderDTO>>(paginatedOrders), totalPages, page, totalCount);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException($"An error occurred while querying orders: {ex.Message}", ex);
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