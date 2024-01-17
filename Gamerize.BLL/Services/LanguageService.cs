using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
	public class LanguageService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IRepository<Language> _repository;
		private readonly IMapper _mapper;

		public LanguageService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_repository = _unitOfWork.GetRepository<Language>();
			_mapper = mapper;
		}
		public async Task<LanguageDTO> CreateAsync(LanguageDTO newEntity)
		{
			try
			{
				var exists = await _repository.Get()
					.AnyAsync(x => x.Name.ToUpper().Trim() == newEntity.Value.ToUpper().Trim());

				if (exists)
					throw new DuplicateItemException(ExceptionMessage(newEntity.Value));

				var entity = new Language
				{
					Id = default,
					Name = newEntity.Value.Trim(),
				};

				await _repository.AddAsync(entity);
				await _unitOfWork.SaveChangesAsync();
				return _mapper.Map<LanguageDTO>(entity);
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<ICollection<LanguageDTO>> GetAllAsync()
		{
			try
			{
				return _mapper.Map<ICollection<LanguageDTO>>(await _repository.GetAllAsync());
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<LanguageDTO> GetByIdAsync(int id)
		{
			try
			{
				return _mapper.Map<LanguageDTO>(await _repository.GetByIdAsync(id)) ??
					throw new InvalidIdException(ExceptionMessage(id));
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<LanguageDTO> UpdateAsync(LanguageDTO editEntity)
		{
			try
			{
				var currentEntity = await _repository.GetByIdAsync(editEntity.Id) ??
					throw new InvalidIdException(ExceptionMessage(editEntity.Id));

				var tagExists = await _repository.Get()
					.AnyAsync(x => x.Name.ToUpper().Trim() == editEntity.Value.ToUpper().Trim());

				if (tagExists)
					throw new DuplicateItemException(ExceptionMessage(editEntity.Value));

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
				int idt when value is int => $"Мови з id: {idt} ще/вже не існує!",
				string namet when value is string => $"Мова з назваю {namet} вже існує",
				_ => "Something has gone wrong"
			};
	}
}
