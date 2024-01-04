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

		public async Task<DiscountDTO> CreateAsync(DiscountDTO newDiscount)
		{
			try
			{
				if (newDiscount.EndDiscount < DateTime.Now.AddHours(1))
					throw new InvalidOperationException(ExceptionMessage(name: newDiscount.EndDiscount.ToString()));

				var discount = new Discount
				{
					Id = default,
					ProductId = newDiscount.ProductId,
					CurrentDiscount = newDiscount.CurrentDiscount,
					EndDiscount = newDiscount.EndDiscount
				};

				await _repository.AddAsync(discount);
				await _unitOfWork.SaveChangesAsync();
				return _mapper.Map<DiscountDTO>(discount);
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
					throw new InvalidIdException(ExceptionMessage(id: id));
			}
			catch (DbUpdateException ex)
			{
				throw new ServerErrorException(ex.Message, ex);
			}
		}
		public async Task<DiscountDTO> UpdateAsync(DiscountDTO editDiscount)
		{
			try
			{
				var discount = await _repository.GetByIdAsync(editDiscount.Id) ??
					throw new InvalidIdException(ExceptionMessage(id: editDiscount.Id));

				_mapper.Map(editDiscount, discount);
				await _unitOfWork.SaveChangesAsync();
				return editDiscount;
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
					throw new InvalidIdException(ExceptionMessage(id: id));
				await _repository.DeleteAsync(discount);
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
				return $"{name} - або акція вже у минулому, або занадто мало часу для неї!!!";
			return "Something has gone wrong";
		}
	}
}
