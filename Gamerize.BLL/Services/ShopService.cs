using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.Extensions.Logging;

namespace Gamerize.BLL.Services
{
	public class ShopService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
		private readonly IRepository<Category> categoryRepository;
		private readonly ILogger _logger;

		public ShopService(IUnitOfWork unitOfWork, IMapper mapper, ILogger<ShopService> logger)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
			_logger = logger;
			categoryRepository = _unitOfWork.GetRepository<Category>();

		}

		public async Task<ICollection<CategoryDTO>> GetCategoriesAsync()
		{
			return _mapper.Map<ICollection<CategoryDTO>>(await categoryRepository.GetAllAsync());
		}

		public async Task<CategoryDTO> GetCategoryByIdAsync(int id)
		{
			return _mapper.Map<CategoryDTO>(await categoryRepository.GetByIdAsync(id) ?? throw new ArgumentException("Invalid Id"));
		}

		public async Task<bool> AddCategoryAsync(CategoryDTO categoryDTO)
		{
			try
			{
				var category = _mapper.Map<Category>(categoryDTO);
				await categoryRepository.AddAsync(category);
				await _unitOfWork.SaveChangesAsync();
				return true;
			}
			catch (ArgumentException ex)
			{
				_logger.LogError("Error {ex}", ex.InnerException.Message ?? ex.Message);
				return false;
			}
		}

		public async Task<bool> UpdateCategoryAsync(CategoryDTO categoryDTO)
		{
			try
			{
				var category = categoryRepository.GetById(categoryDTO.Id);
				category.Name = categoryDTO.Name;
				category.Description = categoryDTO.Description;
				await categoryRepository.UpdateAsync(category);
				await _unitOfWork.SaveChangesAsync();
				return true;
			}
			catch (ArgumentException ex)
			{
				//TODO Add the logger in UpdateCategoryAsync method
				_logger.LogError("Error: {ex}", ex.InnerException.Message ?? ex.Message);
				return false;
			}
		}

		public async Task<bool> DeleteCategoryAsync(int id)
		{
			try
			{
				var category = categoryRepository.GetById(id) ?? throw new ArgumentException("Invalid ID!!!");
				await categoryRepository.DeleteAsync(category);
				await _unitOfWork.SaveChangesAsync();
				return true;
			}
			catch
			(ArgumentException ex)
			{
				_logger.LogError("Error: {ex}", ex.Message);
				return false;
			}
		}
	}
}
