using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
	public class TagService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IRepository<Tag> _repository;
		private readonly IMapper _mapper;

		public TagService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_mapper = mapper;
			_unitOfWork = unitOfWork;
			_repository = _unitOfWork.GetRepository<Tag>();
		}

		public async Task<TagDTO> CreateAsync(TagDTO newTag)
		{
			try
			{
				var tagExists = await _repository.Get()
					.AnyAsync(x => x.Name.ToUpper().Trim() == newTag.Name.ToUpper().Trim());

				if (tagExists)
					throw new DuplicateItemException(ExceptionMessage(name: newTag.Name));

				var tag = new Tag
				{
					Id = default,
					Name = newTag.Name.ToUpper().Trim(),
				};

				await _repository.AddAsync(tag);
				await _unitOfWork.SaveChangesAsync();
				return _mapper.Map<TagDTO>(tag);
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<ICollection<TagDTO>> GetAllAsync()
		{
			try
			{
				return _mapper.Map<ICollection<TagDTO>>(await _repository.GetAllAsync());
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<TagDTO> GetByIdAsync(int id)
		{
			try
			{
				return _mapper.Map<TagDTO>(await _repository.GetByIdAsync(id)) ??
					throw new InvalidIdException(ExceptionMessage(id: id));
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<TagDTO> UpdateAsync(TagDTO editTag)
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
				return $"Тег з id: {id} ще/вже не існує!";
			if (name is not null)
				return $"Тег з назваю {name} вже існує";
			return "Something has gone wrong";
		}
	}
}
