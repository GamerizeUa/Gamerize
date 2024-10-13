using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;
using SendGrid.Helpers.Errors.Model;

namespace Gamerize.BLL.Services
{
    public class DiscountCouponService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<DiscountCoupon> _repository;
        private readonly IMapper _mapper;

        public DiscountCouponService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _repository = _unitOfWork.GetRepository<DiscountCoupon>();
            _mapper = mapper;
        }

        public async Task<DiscountCouponDTO> CreateAsync(DiscountCouponDTO newEntity)
        {
            try
            {
                if (newEntity.ActiveTo < DateTime.Now.AddHours(1))
                    throw new InvalidOperationException(ExceptionMessage(newEntity.ActiveTo.ToString()));

                var entity = new DiscountCoupon()
                {
                    Id = default,
                    Code = newEntity.Code,
                    ActiveFrom = newEntity.ActiveFrom,
                    ActiveTo = newEntity.ActiveTo,
                    Discount = newEntity.Discount
                };

                await _repository.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                return _mapper.Map<DiscountCouponDTO>(entity);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<ICollection<DiscountCouponDTO>> GetAllAsync()
        {
            try
            {
                return _mapper.Map<ICollection<DiscountCouponDTO>>(await _repository.GetAllAsync());
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<DiscountCouponDTO> GetByIdAsync(int id)
        {
            try
            {
                return _mapper.Map<DiscountCouponDTO>(await _repository.GetByIdAsync(id)) ??
                       throw new InvalidIdException(ExceptionMessage(id));
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<DiscountCouponDTO> UpdateAsync(DiscountCouponDTO editEntity)
        {
            try
            {
                var currentEntity = await _repository.GetByIdAsync(editEntity.Id) ??
                                    throw new InvalidIdException(ExceptionMessage(editEntity.Id));

                if (editEntity.ActiveTo < DateTime.Now.AddHours(1))
                    throw new InvalidOperationException(ExceptionMessage(editEntity.ActiveTo.ToString()));

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
                var coupon = await _repository.GetByIdAsync(id) ??
                             throw new InvalidIdException(ExceptionMessage(id));
                await _repository.DeleteAsync(coupon);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<(double, int)> GetDiscountByPromoCodeAsync(string promoCode)
        {
            try
            {
                var coupon = await _repository.Get().FirstOrDefaultAsync(c => c.Code == promoCode);

                if (coupon == null || coupon.ActiveTo < DateTime.Now)
                {
                    throw new NotFoundException($"Промокод {promoCode} не знайдено або він недійсний.");
                }

                return (coupon.Discount, coupon.Id);
            }
            catch (Exception ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }


        private string ExceptionMessage(object? value = null) =>
            value switch
            {
                int idt when value is int => $"Купона з id: {idt} ще/вже не існує!",
                string namet when value is string =>
                    $"Дата та/або час {namet} є некоректні!/nНе може бути менше ніж на 1 годину від поточного часу!",
                _ => "Something has gone wrong"
            };
    }

}


