using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
	public class CategorySevice
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IRepository<Category> _repository;
		private readonly IMapper _mapper;
		public CategorySevice(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(unitOfWork));
			_unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
			_repository = _unitOfWork.GetRepository<Category>();
		}

		public async Task<CategoryDTO> AddNewCategoryAsync(CategoryDTO newCategory)
		{
			try
			{
				bool categoryExists = await _repository.Get()
				.AnyAsync(cat => cat.Name.ToUpper() == newCategory.Name.ToUpper());

				if (categoryExists)
					throw new DuplicateItemException($"Категорія з назваю {newCategory.Name} вже існує");

				var category = new Category
				{
					Id = default,
					Name = newCategory.Name.Trim(),
					Description = newCategory.Description.Trim(),
				};
				await _repository.AddAsync(category);
				await _unitOfWork.SaveChangesAsync();
				return _mapper.Map<CategoryDTO>(category);
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<CategoryDTO> GetCategoryAsync(int id)
		{
			try
			{
				return _mapper.Map<CategoryDTO>(await _repository.GetByIdAsync(id)
					?? throw new InvalidIdException($"Категорії з id: {id} ще/вже не існує!"));
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<ICollection<CategoryDTO>> GetAllCategoriesAsync()
		{
			try
			{
				return _mapper.Map<ICollection<CategoryDTO>>(await _repository.GetAllAsync());
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<CategoryDTO> UpdateCategoryAsync(CategoryDTO editCategory)
		{
			try
			{
				var category = await _repository.GetByIdAsync(editCategory.Id)
					?? throw new InvalidIdException($"Категорії з id: {editCategory.Id} ще/вже не існує!");
				var updated = _mapper.Map(editCategory, category);
				await _repository.UpdateAsync(updated);
				await _unitOfWork.SaveChangesAsync();
				return editCategory;
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task DeleteCategoryAsync(int id)
		{
			try
			{
				var category = await _repository.GetByIdAsync(id)
						?? throw new InvalidIdException($"Категорії з id: {id} ще/вже не існує!");
				await _repository.DeleteAsync(category);
				await _unitOfWork.SaveChangesAsync();
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
	}
}
