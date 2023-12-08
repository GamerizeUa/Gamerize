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
				var spec = new ProductSpecification().IncludeImage();
				var test = await _unitOfWork.GetRepository<Product>().GetAllAsync(spec);
				return Ok(_mapper.Map<ICollection<ProductShortDTO>>(test));
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
				var tagIdsToKeep = newProduct.TagsId;
				var tags = await _unitOfWork.GetRepository<Tag>().GetAllAsync();
				var filteredTags = tags.Where(tag => tagIdsToKeep.Contains(tag.Id)).ToList();

				var product = new Product()
				{
					Id = 0,
					CategoryId = newProduct.CategoryId,
					Name = newProduct.Name,
					Description = newProduct.Description,
					MinAge = newProduct.MinAge,
					MinPlayers = newProduct.MinPlayers,
					MaxPlayers = newProduct.MaxPlayers,
					MinGameTimeMinutes = newProduct.MinGameTimeMinutes,
					MaxGameTimeMinutes = newProduct.MaxGameTimeMinutes,
					GenreId = newProduct.GenreId,
					LanguageId = newProduct.LanguageId,
					Price = newProduct.Price,
					ThemeId = newProduct.ThemeId,
					Tags = filteredTags
				};

				await _unitOfWork.GetRepository<Product>().AddAsync(product);
				await _unitOfWork.SaveChangesAsync();

				int productId = product.Id;
				string folderPath = Path.Combine(Config.ProductImagesPath, productId.ToString());

				if (!Directory.Exists(folderPath))
					Directory.CreateDirectory(folderPath);

				foreach (var image in newProduct.Images)
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
				return Ok($"Product with ID {productId} and images created successfully.");

			}
			catch (AutoMapperMappingException ex)
			{
				return StatusCode(500, "Internal Server Error. Please try again later.");
			}
		}
	}
}
