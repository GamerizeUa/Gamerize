using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Admin;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
    public class WishListService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<WishList> _repository;
        private readonly IRepository<Product> _productRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<DAL.Entities.Admin.User> _userManager;

        public WishListService(IUnitOfWork unitOfWork, IRepository<WishList> repository, IRepository<Product> productRepository,
            IMapper mapper, UserManager<DAL.Entities.Admin.User> userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _repository = repository;
            _productRepository = productRepository;
            _userManager = userManager;
        }

        public async Task<WishListDTO> AddProductInWishList(WishListDTO wishListDTO)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(wishListDTO.UserId.ToString());
                if (user == null)
                {
                    throw new Exception("User not found");
                }

                var productExists = await _productRepository.GetByIdAsync(wishListDTO.ProductId);
                if (productExists == null)
                {
                    throw new InvalidOperationException("Product not found in the database.");
                }

                var existingProductInWishList = await _repository.
                    FindAsync(wl => wl.UserId == wishListDTO.UserId && wl.ProductId == wishListDTO.ProductId);
                if (existingProductInWishList.Any())
                {
                    throw new InvalidOperationException("Product is already in the wishlist.");
                }

                var wishList = new WishList
                {
                    UserId = wishListDTO.UserId,
                    ProductId = wishListDTO.ProductId,
                };

                await _repository.AddAsync(wishList);
                await _unitOfWork.SaveChangesAsync();

                return _mapper.Map<WishListDTO>(wishList);
            }
            catch (InvalidOperationException ex)
            {
                throw new DuplicateItemException("Product is already in the wishlist.", ex);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException("Error occurred while saving to database.", ex);
            }
        }

        public async Task<(IEnumerable<WishListDTO> Items, int TotalPages)> GetAllItemsFromWishList(int userId, int page, int pageSize)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId.ToString());
                if (user == null)
                {
                    throw new Exception("User not found");
                }

                var wishListItemsQuery = _repository
                    .Get()
                    .Where(wl => wl.UserId == userId)
                    .Include(wl => wl.Product)
                    .Include(wl => wl.Product.Language)
                    .Include(wl => wl.Product.Category)
                    .Include(wl => wl.Product.Genre)
                    .Include(wl => wl.Product.Theme)
                    .Include(wl => wl.Product.Feedbacks)
                    .Include(wl => wl.Product.Tags)
                    .Include(wl => wl.Product.Images)
                    .Include(wl => wl.Product.Ratings)
                    .Include(wl => wl.Product.Discounts);

                int totalCount = await wishListItemsQuery.CountAsync();
                int totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

                var pagedWishList = await wishListItemsQuery
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                var mappedWishList = _mapper.Map<IEnumerable<WishListDTO>>(pagedWishList);

                return (mappedWishList, totalPages);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException("Error occurred while accessing the database.", ex);
            }
        }

        public async Task RemoveFromWishList(int userId, List<int> productIds)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId.ToString());
                if (user == null)
                {
                    throw new InvalidIdException("User not found");
                }

                foreach (int productId in productIds)
                {
                    var itemToRemove = await _repository
                        .Get()
                        .FirstOrDefaultAsync(wl => wl.UserId == userId && wl.ProductId == productId);

                    if (itemToRemove == null)
                    {
                        throw new InvalidIdException($"Product with Id: {productId} not found in the wishlist!");
                    }

                    await _repository.DeleteAsync(itemToRemove);
                }

                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException("Error occurred while accessing the database.", ex);
            }
            catch (Exception ex)
            {
                throw new ServerErrorException("An unexpected error occurred.", ex);
            }
        }

    }
}