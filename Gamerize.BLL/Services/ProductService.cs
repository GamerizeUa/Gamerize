using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.BLL.Specifications;
using Gamerize.Common.Config;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
	public class ProductService
	{
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

				if (!await EntityExistsAsync<Category>(newEntity.CategoryId))
					throw new InvalidIdException($"Категорії з ID: {newEntity.CategoryId} ще/вже не існує.");

				if (!await EntityExistsAsync<Genre>(newEntity.GenreId))
					throw new InvalidIdException($"Жанру з ID: {newEntity.GenreId} ще/вже не існує.");

				if (!await EntityExistsAsync<Theme>(newEntity.ThemeId))
					throw new InvalidIdException($"Тематики з ID: {newEntity.ThemeId} ще/вже не існує.");

				var product = await CreateProductAsync(newEntity);
				await SaveImagesAsync(newEntity.NewImages, product.Id);
				return _mapper.Map<ProductFullDTO>(product);
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<ICollection<ProductShortDTO>> GetSimpleListAsync()
		{
			try
			{
				var spec = new ProductSpecification().IncludeShort();
				var products = await _repository.GetAllAsync(spec);
				var productsDTO = _mapper.Map<ICollection<ProductShortDTO>>(products)
					.Select(item =>
					{
						item.ImagePath ??= Path.Combine(Config.ProductImagesPath, Config.NoImage);
						return item;
					});
				return _mapper.Map<ICollection<ProductShortDTO>>(productsDTO);
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<ProductFullDTO> GetByIdAsync(int id)
		{
			var spec = new ProductSpecification().ById(id).IncludeAll();

			var product = (await _repository.GetAllAsync(spec)).FirstOrDefault();
			return (product is not null) ? _mapper.Map<ProductFullDTO>(product) :
			throw new InvalidIdException(ExceptionMessage(id));
		}
		public async Task<bool> Delete(int id)
		{
			try
			{
				var spec = new ProductSpecification().ById(id).IncludeAll();
				var product = (await _repository.GetAllAsync(spec)).FirstOrDefault()
					?? throw new InvalidIdException(ExceptionMessage(id));
				var folderPath = Path.Combine(Config.ProductImagesPath, product.Id.ToString());
				await _repository.DeleteAsync(product);
				await _unitOfWork.SaveChangesAsync();
				return true;
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
