using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
	public class DiscountSevice
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IRepository<Discount> _repository;
		private readonly IMapper _mapper;

		public DiscountSevice(IUnitOfWork unitOfWork, IRepository<Discount> repository, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_repository = repository;
			_mapper = mapper;
		}

		public async Task<DiscountDTO> CreateAsync(DiscountDTO newEntity)
		{
			try
			{
				if (newEntity.EndDiscount < DateTime.Now.AddHours(1))
					throw new InvalidOperationException(ExceptionMessage(newEntity.EndDiscount.ToString()));

				var entity = new Discount
				{
					Id = default,
					ProductId = newEntity.ProductId,
					CurrentDiscount = newEntity.CurrentDiscount,
					EndDiscount = newEntity.EndDiscount
				};

				await _repository.AddAsync(entity);
				await _unitOfWork.SaveChangesAsync();
				return _mapper.Map<DiscountDTO>(entity);
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<ICollection<DiscountDTO>> GetAllAsync()
		{
			try
			{
				return _mapper.Map<ICollection<DiscountDTO>>(await _repository.GetAllAsync());
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<DiscountDTO> GetByIdAsync(int id)
		{
			try
			{
				return _mapper.Map<DiscountDTO>(await _repository.GetByIdAsync(id)) ??
					throw new InvalidIdException(ExceptionMessage(id));
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<DiscountDTO> UpdateAsync(DiscountDTO editEntity)
		{
			try
			{
				var currentEntity = await _repository.GetByIdAsync(editEntity.Id) ??
					throw new InvalidIdException(ExceptionMessage(editEntity.Id));

				if (editEntity.EndDiscount < DateTime.Now.AddHours(1))
					throw new InvalidOperationException(ExceptionMessage(editEntity.EndDiscount.ToString()));

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
				var discount = await _repository.GetByIdAsync(id) ??
					throw new InvalidIdException(ExceptionMessage(id));
				await _repository.DeleteAsync(discount);
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
				int idt when value is int => $"Знижки з id: {idt} ще/вже не існує!",
				string namet when value is string => $"Дата та/або час {namet} є некоректні!/nНе може бути менше ніж на 1 годину від поточного часу!",
				_ => "Something has gone wrong"
			};
	}
}
