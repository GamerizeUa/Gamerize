using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.BLL.Specifications;
using Gamerize.Common.Config;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Image = Gamerize.DAL.Entities.Shop.Image;

namespace webapi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductController : ControllerBase
	{
		private readonly IMapper _mapper;
		private readonly IUnitOfWork _unitOfWork;
		public ProductController(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}

		[HttpGet("GetSimpleList")]
		public async Task<ActionResult<ICollection<ProductShortDTO>>> GetSimpleList()
		{
			try
			{
				var spec = new ProductSpecification().IncludeShort();
				var products = await _unitOfWork.GetRepository<Product>().GetAllAsync(spec);
				var productsDTO = _mapper.Map<ICollection<ProductShortDTO>>(products)
					.Select(item =>
						{
							item.ImagePath ??= Path.Combine(Config.ProductImagesPath, Config.NoImage);
							return item;
						});
				return Ok(_mapper.Map<ICollection<ProductShortDTO>>(productsDTO));
			}
			catch
			{
				return StatusCode(500, "Internal Server Error. Please try again later.");
			}
		}

		[HttpGet("GetById/{id:int}")]
		public async Task<ActionResult<ProductFullDTO>> GetById(int id)
		{
			var spec = new ProductSpecification().ById(id).IncludeAll();

			var product = (await _unitOfWork.GetRepository<Product>().GetAllAsync(spec)).FirstOrDefault();
			return (product is not null) ? Ok(_mapper.Map<ProductFullDTO>(product)) :
			BadRequest($"Invalid product Id:{id}!");
		}

		[HttpPost("Create")]
		public async Task<IActionResult> Create([FromForm] ProductNewDTO newProduct)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			try
			{
				if (!await EntityExistsAsync<Language>(newProduct.LanguageId))
					return BadRequest($"Language with ID {newProduct.LanguageId} does not exist.");

				if (!await EntityExistsAsync<Category>(newProduct.CategoryId))
					return BadRequest($"Category with ID {newProduct.CategoryId} does not exist.");

				if (!await EntityExistsAsync<Genre>(newProduct.GenreId))
					return BadRequest($"Genre with ID {newProduct.GenreId} does not exist.");

				if (!await EntityExistsAsync<Theme>(newProduct.ThemeId))
					return BadRequest($"Theme with ID {newProduct.ThemeId} does not exist.");

				var product = await CreateProductAsync(newProduct);
				await SaveImagesAsync(newProduct.NewImages, product.Id);

				return Ok($"Product with ID {product.Id} and images created successfully.");
			}
			catch
			{
				return StatusCode(500, "Internal Server Error. Please try again later.");
			}
		}

		[HttpDelete("Delete/{id:int}")]
		public async Task<IActionResult> Delete(int id)
		{
			
			var spec = new ProductSpecification().ById(id).IncludeAll();
			var product = (await _unitOfWork.GetRepository<Product>().GetAllAsync(spec))
			.FirstOrDefault();
			if (product is null)
				return BadRequest($"Invalid product Id:{id}!");
			var folderPath = Path.Combine(Config.ProductImagesPath, product.Id.ToString());
			await _unitOfWork.GetRepository<Product>().DeleteAsync(product);
			await _unitOfWork.SaveChangesAsync();
			
			if (Directory.Exists(folderPath))
				Directory.Delete(folderPath, true);

			return NoContent();
		}

		#region Supporting methods
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
					ProductId = productId
				};

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