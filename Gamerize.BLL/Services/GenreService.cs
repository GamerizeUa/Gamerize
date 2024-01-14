using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
	public class GenreService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IRepository<Genre> _repository;
		private readonly IMapper _mapper;

		public GenreService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_repository = _unitOfWork.GetRepository<Genre>();
			_mapper = mapper;
		}
		public async Task<GenreDTO> CreateAsync(GenreDTO newEntity)
		{
			try
			{
				var exists = await _repository.Get()
					.AnyAsync(x => x.Name.ToUpper().Trim() == newEntity.Name.ToUpper().Trim());

				if (exists)
					throw new DuplicateItemException(ExceptionMessage(newEntity.Name));

				var entity = new Genre
				{
					Id = default,
					Name = newEntity.Name.ToUpper().Trim(),
				};

				await _repository.AddAsync(entity);
				await _unitOfWork.SaveChangesAsync();
				return _mapper.Map<GenreDTO>(entity);
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<ICollection<GenreDTO>> GetAllAsync()
		{
			try
			{
				return _mapper.Map<ICollection<GenreDTO>>(await _repository.GetAllAsync());
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<GenreDTO> GetByIdAsync(int id)
		{
			try
			{
				return _mapper.Map<GenreDTO>(await _repository.GetByIdAsync(id)) ??
					throw new InvalidIdException(ExceptionMessage(id));
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<GenreDTO> UpdateAsync(GenreDTO editEntity)
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
				int idt when value is int => $"Жанра з id: {idt} ще/вже не існує!",
				string namet when value is string => $"Жанр з назваю {namet} вже існує",
				_ => "Something has gone wrong"
			};
	}
}
