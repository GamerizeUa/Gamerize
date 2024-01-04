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

		public LanguageService(IUnitOfWork unitOfWork, IRepository<Language> repository, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_repository = repository;
			_mapper = mapper;
		}

		public async Task<LanguageDTO> CreateAsync(LanguageDTO newLanguege)
		{
			try
			{
				var langExists = await _repository.Get()
				.AnyAsync(x => x.Value.ToUpper().Trim() == newLanguege.Value.ToUpper().Trim());

				if (langExists)
					throw new DuplicateItemException(ExceptionMessage(name: newLanguege.Value));

				var language = new Language
				{
					Id = default,
					Value = newLanguege.Value.Trim(),
				};

				await _repository.AddAsync(language);
				await _unitOfWork.SaveChangesAsync();
				return _mapper.Map<LanguageDTO>(language);
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
					throw new InvalidIdException(ExceptionMessage(id: id));
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<LanguageDTO> UpdateAsync(LanguageDTO editLanguage)
		{
			try
			{
				var language = await _repository.GetByIdAsync(editLanguage.Id) ??
					throw new InvalidIdException(ExceptionMessage(id: editLanguage.Id));

				var languageExists = await _repository.Get()
					.AnyAsync(x => x.Value.ToUpper().Trim() == editLanguage.Value.ToUpper().Trim());

				if (languageExists)
					throw new DuplicateItemException(ExceptionMessage(name: editLanguage.Value));

				_mapper.Map(editLanguage, language);
				await _unitOfWork.SaveChangesAsync();
				return editLanguage;
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
				return $"Мови з id: {id} ще/вже не існує!";
			if (name is not null)
				return $"Мова з назваю {name} вже існує";
			return "Something has gone wrong";
		}
	}
}
