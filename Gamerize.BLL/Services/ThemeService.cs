using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
	public class ThemeService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IRepository<Theme> _repository;
		private readonly IMapper _mapper;

		public ThemeService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_mapper = mapper;
			_unitOfWork = unitOfWork;
			_repository = _unitOfWork.GetRepository<Theme>();
		}

		public async Task<ThemeDTO> CreateAsync(ThemeDTO newTheme)
		{
			try
			{
				var tagExists = await _repository.Get()
				.AnyAsync(x => x.Name.ToUpper().Trim() == newTheme.Name.ToUpper().Trim());

				if (tagExists)
					throw new DuplicateItemException($"Тематика з назваю {newTheme.Name} вже існує");

				var theme = new Theme
				{
					Id = default,
					Name = newTheme.Name.Trim(),
					Description = newTheme.Description,
				};

				await _repository.AddAsync(theme);
				await _unitOfWork.SaveChangesAsync();
				return _mapper.Map<ThemeDTO>(theme);
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}

		public async Task<ICollection<ThemeDTO>> GetAllAsync()
		{
			try
			{
				return _mapper.Map<ICollection<ThemeDTO>>(await _repository.GetAllAsync());
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<ThemeDTO> GetByIdAsync(int id)
		{
			try
			{
				return _mapper.Map<ThemeDTO>(await _repository.GetByIdAsync(id)) ??
					throw new InvalidIdException($"Тематика з id: {id} ще/вже не існує!");
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<ThemeDTO> UpdateAsync(ThemeDTO editTheme)
		{
			try
			{
				var theme = await _repository.GetByIdAsync(editTheme.Id) ??
					throw new InvalidIdException($"Тематика з id: {editTheme.Id} ще/вже не існує!");

				var themeExists = await _repository.Get()
					.AnyAsync(x => x.Name.ToUpper().Trim() == editTheme.Name.ToUpper().Trim());

				if (themeExists)
					throw new DuplicateItemException($"Тематика з назваю {editTheme.Name} вже існує");

				_mapper.Map(editTheme, theme);
				await _unitOfWork.SaveChangesAsync();
				return editTheme;
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
				var tag = await _repository.GetByIdAsync(id) ??
					throw new InvalidIdException($"Тематика з id: {id} ще/вже не існує!");
				await _repository.DeleteAsync(tag);
				await _unitOfWork.SaveChangesAsync();
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
	}
}
