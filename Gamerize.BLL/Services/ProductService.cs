using AutoMapper;
using Gamerize.BLL.Builder;
using Gamerize.BLL.Models;
using Gamerize.BLL.Models.Requests;
using Gamerize.BLL.Specifications;
using Gamerize.Common.Config;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Gamerize.BLL.Services
{
    public class ProductService
    {
        private const decimal MinPrice = 0m;
        private const decimal MaxPrice = 9999.99m;

        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Product> _repository;
        private readonly IMapper _mapper;

        public ProductService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _repository = _unitOfWork.GetRepository<Product>();
            _mapper = mapper;
        }

        public async Task<ProductFullDTO> CreateAsync(ProductNewDTO newEntity)
        {
            try
            {
                if (!await EntityExistsAsync<Language>(newEntity.LanguageId))
                    throw new InvalidIdException($"Мови з ID: {newEntity.LanguageId} ще/вже не існує.");

                if (newEntity.CategoryId.HasValue && !await EntityExistsAsync<Category>(newEntity.CategoryId.Value))
                    throw new InvalidIdException($"Категорії з ID: {newEntity.CategoryId} ще/вже не існує.");

                if (newEntity.GenreId.HasValue && !await EntityExistsAsync<Genre>(newEntity.GenreId.Value))
                    throw new InvalidIdException($"Жанру з ID: {newEntity.GenreId} ще/вже не існує.");

                if (newEntity.ThemeId.HasValue && !await EntityExistsAsync<Theme>(newEntity.ThemeId.Value))
                    throw new InvalidIdException($"Тематики з ID: {newEntity.ThemeId} ще/вже не існує.");

                if (newEntity.PuzzleId.HasValue && !await EntityExistsAsync<Puzzle>(newEntity.PuzzleId.Value))
                    throw new InvalidIdException($"Puzzle з ID: {newEntity.PuzzleId} ще/вже не існує.");

                if (newEntity.MindGamesId.HasValue && !await EntityExistsAsync<MindGames>(newEntity.MindGamesId.Value))
                    throw new InvalidIdException($"MindGames з ID: {newEntity.MindGamesId} ще/вже не існує.");

                if (decimal.TryParse(newEntity.Price.ToString(), NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out decimal parsedPrice))
                {
                    if (parsedPrice < MinPrice || parsedPrice > MaxPrice)
                    {
                        throw new InvalidIdException($"Price must be between {MinPrice} and {MaxPrice}.");
                    }
                    newEntity.Price = parsedPrice;
                }
                else
                {
                    throw new InvalidIdException("Price value is not in a valid format.");
                }

                var product = await CreateProductAsync(newEntity);

                if (newEntity.NewImages != null && newEntity.NewImages.Any())
                {
                    await SaveImagesAsync(newEntity.NewImages, product.Id);
                }

                return _mapper.Map<ProductFullDTO>(product);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<(IEnumerable<ProductFullDTO> products, int totalPages)> GetFilteredProductsAsync(ProductListFilterRequest filterRequest, int page, int pageSize)
        {
            try
            {
                var query = _repository.Get()
                    .Include(x => x.Language)
                    .Include(x => x.Category)
                    .Include(x => x.Genre)
                    .Include(x => x.Theme)
                    .Include(x => x.Feedbacks)
                    .Include(x => x.Tags)
                    .Include(x => x.Images);

                var products = await query.ToListAsync();
                var productsDTO = _mapper.Map<List<ProductFullDTO>>(products);

                if (filterRequest != null)
                {
                    FilterBuilder filterBuilder = new FilterBuilder();

                    if (filterRequest.HasFilters())
                    {
                        productsDTO = filterBuilder.ApplyFilters(productsDTO, filterRequest).ToList();
                    }

                    if (!string.IsNullOrEmpty(filterRequest.SortOrder))
                    {
                        productsDTO = filterBuilder.ApplySorting(productsDTO, filterRequest.SortOrder).ToList();
                    }
                }

                int totalCount = productsDTO.Count();
                int totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

                var pagedProducts = productsDTO
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                var result = pagedProducts.Select(item =>
                {
                    var mainImage = item.Images.FirstOrDefault();
                    if (mainImage != null)
                    {
                        mainImage.Path = Path.Combine(Config.ProductImagesPath, mainImage.Path);
                    }
                    else
                    {
                        var noImage = new ImageDTO { Path = Path.Combine(Config.ProductImagesPath, Config.NoImage) };
                        item.Images = new List<ImageDTO> { noImage };
                    }

                    return item;
                });

                return (result, totalPages);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<object> GetByIdAsync(int id)
        {
            try
            {
                var product = await _repository.Get()
                    .Include(x => x.Language)
                    .Include(x => x.Category)
                    .Include(x => x.Genre)
                    .Include(x => x.Theme)
                    .Include(x => x.Feedbacks)
                    .Include(x => x.Tags)
                    .Include(x => x.Images)
                    .Include(x => x.Ratings)
                    .FirstOrDefaultAsync(x => x.Id == id);

                if (product is null)
                {
                    throw new InvalidIdException(ExceptionMessage(id));
                }

                var averageRating = product.Ratings.Any()
                    ? product.Ratings.Average(r => r.Rate)
                    : 0;

                var productDTO = _mapper.Map<ProductFullDTO>(product);

                return new
                {
                    Product = productDTO,
                    AverageRating = averageRating
                };
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<ProductFullDTO>> GetPopularProductsAsync(int count = 10)
        {
            try
            {
                var query = _repository.Get()
                    .Include(x => x.Language)
                    .Include(x => x.Category)
                    .Include(x => x.Genre)
                    .Include(x => x.Theme)
                    .Include(x => x.Feedbacks)
                    .Include(x => x.Tags)
                    .Include(x => x.Images)
                    .Include(x => x.Ratings);

                var productsWithRatings = await query
                    .Select(p => new
                    {
                        Product = p,
                        AverageRating = p.Ratings.Any() ? p.Ratings.Average(r => r.Rate) : 0
                    })
                    .OrderByDescending(p => p.AverageRating)
                    .ThenBy(p => p.Product.Name)
                    .Take(count)  
                    .ToListAsync();

                var result = productsWithRatings
                    .Select(p => _mapper.Map<ProductFullDTO>(p.Product))
                    .ToList();

                return result;
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<object>> GetProductsWithBiggestDiscountAsync(int count = 10)
        {
            try
            {
                var query = _repository.Get()
                    .Include(x => x.Language)
                    .Include(x => x.Category)
                    .Include(x => x.Genre)
                    .Include(x => x.Theme)
                    .Include(x => x.Feedbacks)
                    .Include(x => x.Tags)
                    .Include(x => x.Images)
                    .Include(x => x.Ratings)
                    .Include(x => x.Discounts);

                var productsWithDiscounts = await query
                    .Select(p => new
                    {
                        Product = p,
                        BiggestDiscount = p.Discounts.Any() ? p.Discounts.Max(d => d.CurrentDiscount) : 0,
                        NewPrice = p.Discounts.Any() ? p.Price * (decimal)(1 - p.Discounts.Max(d => d.CurrentDiscount)) : p.Price
                    })
                    .OrderByDescending(p => p.BiggestDiscount)
                    .ThenBy(p => p.Product.Name)
                    .Take(count)
                    .ToListAsync();

                var result = productsWithDiscounts
                    .Select(p => new
                    {
                        Product = _mapper.Map<ProductFullDTO>(p.Product),
                        NewPrice = p.NewPrice
                    })
                    .ToList();

                return result;
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<RatingDTO> CreateRate(RatingDTO ratingDTO, int userId)
        {
            try
            {
                var product = await _repository.Get()
                    .Include(x => x.Ratings)
                    .FirstOrDefaultAsync(x => x.Id == ratingDTO.ProductId);

                if (product is null)
                {
                    throw new InvalidIdException(ExceptionMessage(ratingDTO.ProductId));
                }

                if (product.Ratings.Any(r => r.UserId == userId))
                {
                    throw new DuplicateItemException("User has already rated this product.");
                }

                var rating = new Rating
                {
                    ProductId = ratingDTO.ProductId,
                    Rate = ratingDTO.Rate,
                    UserId = userId
                };

                product.Ratings.Add(rating);
                await _unitOfWork.SaveChangesAsync();

                return _mapper.Map<RatingDTO>(rating);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                var spec = new ProductSpecification().ById(id).IncludeAll();
                var product = (await _repository.GetAllAsync(spec)).FirstOrDefault()
                    ?? throw new InvalidIdException(ExceptionMessage(id));

                var folderPath = Path.Combine(Config.ProductImagesPath, product.Id.ToString());
                await _repository.DeleteAsync(product);
                await _unitOfWork.SaveChangesAsync();

                if (Directory.Exists(folderPath))
                    Directory.Delete(folderPath, true);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<ProductFullDTO> UpdateAsync(int id, ProductNewDTO updatedEntity)
        {
            try
            {
                var product = await _repository.Get().FirstOrDefaultAsync(x => x.Id == id)
                    ?? throw new InvalidIdException($"Продукту з ID: {id} ще/вже не існує.");

                if (!await EntityExistsAsync<Language>(updatedEntity.LanguageId))
                    throw new InvalidIdException($"Мови з ID: {updatedEntity.LanguageId} ще/вже не існує.");

                if (updatedEntity.CategoryId.HasValue && !await EntityExistsAsync<Category>(updatedEntity.CategoryId.Value))
                    throw new InvalidIdException($"Категорії з ID: {updatedEntity.CategoryId} ще/вже не існує.");

                if (updatedEntity.GenreId.HasValue && !await EntityExistsAsync<Genre>(updatedEntity.GenreId.Value))
                    throw new InvalidIdException($"Жанру з ID: {updatedEntity.GenreId} ще/вже не існує.");

                if (updatedEntity.ThemeId.HasValue && !await EntityExistsAsync<Theme>(updatedEntity.ThemeId.Value))
                    throw new InvalidIdException($"Тематики з ID: {updatedEntity.ThemeId} ще/вже не існує.");

                if (updatedEntity.PuzzleId.HasValue && !await EntityExistsAsync<Puzzle>(updatedEntity.PuzzleId.Value))
                    throw new InvalidIdException($"Puzzle з ID: {updatedEntity.PuzzleId} ще/вже не існує.");

                if (updatedEntity.MindGamesId.HasValue && !await EntityExistsAsync<MindGames>(updatedEntity.MindGamesId.Value))
                    throw new InvalidIdException($"MindGames з ID: {updatedEntity.MindGamesId} ще/вже не існує.");

                product = _mapper.Map(updatedEntity, product);
                _repository.UpdateAsync(product);
                await _unitOfWork.SaveChangesAsync();

                return _mapper.Map<ProductFullDTO>(product);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        #region Supporting methods
        private string ExceptionMessage(object? value = null) =>
            value switch
            {
                int id when value is int => $"Продукта з id: {id} ще/вже не існує!",
                string name when value is string => $"...",
                _ => "Something has gone wrong"
            };
        private async Task<Product> CreateProductAsync(ProductNewDTO newProduct)
        {
            var tagIdsToKeep = newProduct.NewTags;
            var tags = await _unitOfWork.GetRepository<Tag>().GetAllAsync();
            var filteredTags = tags.Where(tag => tagIdsToKeep.Contains(tag.Id)).ToList();

            var product = _mapper.Map<Product>(newProduct);
            product.Id = default;
            product.Tags = filteredTags;

            await _unitOfWork.GetRepository<Product>().AddAsync(product);
            await _unitOfWork.SaveChangesAsync();

            return product;
        }
        private async Task SaveImagesAsync(ICollection<IFormFile> images, int productId)
        {
            string folderPath = Path.Combine(Config.ProductImagesPath, productId.ToString());

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);
            int number = 1;
            foreach (var image in images)
            {
                string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                string filePath = Path.Combine(folderPath, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                var imageEntity = new Image
                {
                    Path = filePath,
                    Number = number,
                    ProductId = productId
                };
                number++;

                await _unitOfWork.GetRepository<Image>().AddAsync(imageEntity);
            }

            await _unitOfWork.SaveChangesAsync();
        }
        private async Task<bool> EntityExistsAsync<TEntity>(int entityId) where TEntity : class
        {
            var entity = await _unitOfWork.GetRepository<TEntity>().GetByIdAsync(entityId);
            return entity != null;
        }
        #endregion
    }
}
