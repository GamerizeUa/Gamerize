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
		private readonly IRepository<Feedback> feedbackRepository;
		private readonly IRepository<Product> productRepository;
		private readonly ILogger _logger;

		public ShopService(IUnitOfWork unitOfWork, IMapper mapper, ILogger<ShopService> logger)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
			_logger = logger;
			categoryRepository = _unitOfWork.GetRepository<Category>();
			feedbackRepository = _unitOfWork.GetRepository<Feedback>();
			productRepository = _unitOfWork.GetRepository<Product>();

		}
		#region Category services
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
				var category = categoryRepository.GetById(categoryDTO.Id) ?? throw new ArgumentException("Invalid Category ID!");
				category.Name = categoryDTO.Name;
				category.Description = categoryDTO.Description;
				await categoryRepository.UpdateAsync(category);
				await _unitOfWork.SaveChangesAsync();
				return true;
			}
			catch (ArgumentException ex)
			{
				//TODO Add the logger in UpdateCategoryAsync method
				_logger.LogError("Error: {ex}", (ex.InnerException?.Message ?? ex.Message));
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
		#endregion
		#region Product services

		#endregion
		#region Feedback services
		public async Task<ICollection<FeedbackDTO>> GetFeedbacksAsync()
		{
			return _mapper.Map<ICollection<FeedbackDTO>>(await feedbackRepository.GetAllAsync());
		}
		public async Task<ICollection<FeedbackDTO>> GetFeedbacksByProductId(int id)
		{
			var t = (await feedbackRepository.GetAllAsync()).Where(x => x.ProductId == id);
			return _mapper.Map<ICollection<FeedbackDTO>>(t);
		}
		public async Task<FeedbackDTO> GetFeedbackByIdAsync(int id)
		{
			return _mapper.Map<FeedbackDTO>(await feedbackRepository.GetByIdAsync(id) ?? throw new ArgumentException("Invalid Feedback ID!"));
		}
		public async Task<bool> AddFeedbackAsync(FeedbackDTO feedbackDTO)
		{
			try
			{
				if (await productRepository.GetByIdAsync(feedbackDTO.ProductId) is null)
					throw new ArgumentException("Invalid Product Id");
				var feedback = _mapper.Map<Feedback>(feedbackDTO);
				await feedbackRepository.AddAsync(feedback);
				await _unitOfWork.SaveChangesAsync();
				return true;
			}
			catch (ArgumentException ex)
			{
				_logger.LogError("{ex}", ex.InnerException?.Message ?? ex.Message);
				return false;
			}
		}
		public async Task<bool> UpdateFeedbackAsync(FeedbackDTO feedbackDTO)
		{
			try
			{
				if (await productRepository.GetByIdAsync(feedbackDTO.ProductId) is null)
					throw new ArgumentException("Invalid Product Id");
				var feedback = await feedbackRepository.GetByIdAsync(feedbackDTO.Id) ?? throw new ArgumentException("Ivalid Feedback ID!");
				feedback.CustomerName = feedbackDTO.CustomerName;
				feedback.Text = feedbackDTO.Text;
				feedback.Rate = feedbackDTO.Rate;
				await feedbackRepository.UpdateAsync(feedback);
				await _unitOfWork.SaveChangesAsync();
				return true;
			}
			catch (ArgumentException ex)
			{
				_logger.LogError("{ex}", ex.InnerException?.Message ?? ex.Message);
				return false;
			}
		}
		public async Task<bool> DeleteFeedbackAsync(int id)
		{
			try
			{
				var feedback = await feedbackRepository.GetByIdAsync(id) ?? throw new ArgumentException("Invalid Feedback ID!");
				await feedbackRepository.DeleteAsync(feedback);
				await _unitOfWork.SaveChangesAsync();
				return true;
			}
			catch (ArgumentException ex)
			{
				_logger.LogError("{ex}", ex.InnerException?.Message ?? ex.Message);
				return false;
			}
		}
		#endregion
	}
}
