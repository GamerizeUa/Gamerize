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

		public GenreService(IUnitOfWork unitOfWork, IRepository<Genre> repository, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_repository = repository;
			_mapper = mapper;
		}

		public async Task<GenreDTO> CreateAsync(GenreDTO newGenre)
		{
			try
			{
				var tagExists = await _repository.Get()
					.AnyAsync(x => x.Name.ToUpper().Trim() == newGenre.Name.ToUpper().Trim());

				if (tagExists)
					throw new DuplicateItemException(ExceptionMessage(name: newGenre.Name));

				var genre = new Genre
				{
					Id = default,
					Name = newGenre.Name.ToUpper().Trim()
				};

				await _repository.AddAsync(genre);
				await _unitOfWork.SaveChangesAsync();
				return _mapper.Map<GenreDTO>(genre);
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
					throw new InvalidIdException(ExceptionMessage(id: id));
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<GenreDTO> UpdateAsync(GenreDTO editTag)
		{
			try
			{
				var tag = await _repository.GetByIdAsync(editTag.Id) ??
					throw new InvalidIdException(ExceptionMessage(id: editTag.Id));

				var tagExists = await _repository.Get()
					.AnyAsync(x => x.Name.ToUpper().Trim() == editTag.Name.ToUpper().Trim());

				if (tagExists)
					throw new DuplicateItemException(ExceptionMessage(name: editTag.Name));

				_mapper.Map(editTag, tag);
				await _unitOfWork.SaveChangesAsync();
				return editTag;
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
					throw new InvalidIdException(ExceptionMessage(id: id));
				await _repository.DeleteAsync(tag);
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
				return $"Жанр з id: {id} ще/вже не існує!";
			if (name is not null)
				return $"Жанр з назваю {name} вже існує";
			return "Something has gone wrong";
		}
	}
}
