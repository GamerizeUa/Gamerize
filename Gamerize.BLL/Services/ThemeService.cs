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
		public async Task<ThemeDTO> CreateAsync(ThemeDTO newEntity)
		{
			try
			{
				var exists = await _repository.Get()
					.AnyAsync(x => x.Name.ToUpper().Trim() == newEntity.Name.ToUpper().Trim());

				if (exists)
					throw new DuplicateItemException(ExceptionMessage(newEntity.Name));

				var entity = new Theme
				{
					Id = default,
					Name = newEntity.Name.Trim(),
					Description = newEntity.Description.Trim(),
				};

				await _repository.AddAsync(entity);
				await _unitOfWork.SaveChangesAsync();
				return _mapper.Map<ThemeDTO>(entity);
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
					throw new InvalidIdException(ExceptionMessage(id));
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<ThemeDTO> UpdateAsync(ThemeDTO editEntity)
		{
			try
			{
				var currentEntity = await _repository.GetByIdAsync(editEntity.Id) ??
					throw new InvalidIdException(ExceptionMessage(editEntity.Id));

				var tagExists = await _repository.Get()
					.AnyAsync(x => x.Name.ToUpper().Trim() == editEntity.Name.ToUpper().Trim());

				if (tagExists)
					throw new DuplicateItemException(ExceptionMessage(editEntity.Name));

				_mapper.Map(editEntity, currentEntity);
				await _unitOfWork.SaveChangesAsync();
				return editEntity;
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
				var currentEntity = await _repository.GetByIdAsync(id) ??
					throw new InvalidIdException(ExceptionMessage(id));
				await _repository.DeleteAsync(currentEntity);
				await _unitOfWork.SaveChangesAsync();
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		private string ExceptionMessage(object? value = null) =>
			value switch
			{
				int idt when value is int => $"Тематики з id: {idt} ще/вже не існує!",
				string namet when value is string => $"Тематика з назваю {namet} вже існує",
				_ => "Something has gone wrong"
			};
	}
}
