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
			_mapper = mapper;
			_unitOfWork = unitOfWork;
			_repository = _unitOfWork.GetRepository<Category>();
		}

		public async Task<CategoryDTO> CreateAsync(CategoryDTO newCategory)
		{
			try
			{
				bool categoryExists = await _repository.Get()
				.AnyAsync(cat => cat.Name.ToUpper().Trim() == newCategory.Name.ToUpper().Trim());

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
		public async Task<CategoryDTO> GetByIdAsync(int id)
		{
			try
			{
				return _mapper.Map<CategoryDTO>(await _repository.GetByIdAsync(id) ?? 
					throw new InvalidIdException($"Категорії з id: {id} ще/вже не існує!"));
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<ICollection<CategoryDTO>> GetAllAsync()
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
		public async Task<CategoryDTO> UpdateAsync(CategoryDTO editCategory)
		{
			try
			{
				var category = await _repository.GetByIdAsync(editCategory.Id)
					?? throw new InvalidIdException($"Категорії з id: {editCategory.Id} ще/вже не існує!");
				bool categoryExists = await _repository.Get()
				.AnyAsync(cat => cat.Name.ToUpper() == editCategory.Name.ToUpper());

				if (categoryExists)
					throw new DuplicateItemException($"Категорія з назваю {editCategory.Name} вже існує");

				_mapper.Map(editCategory, category);
				await _unitOfWork.SaveChangesAsync();
				return editCategory;
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
		private string ExceptionMessage(int? id = null, string? name = null)
		{
			if (id is not null)
				return $"Категорії з id: {id} ще/вже не існує!";
			if (name is not null)
				return $"Категорія з назваю {name} вже існує";
			return "Something has gone wrong";
		}
	}
}
