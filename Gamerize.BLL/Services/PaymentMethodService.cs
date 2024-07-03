using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Admin;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
    public class PaymentMethodService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<PaymentMethod> _repository;
        private readonly IMapper _mapper;

        public PaymentMethodService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _repository = _unitOfWork.GetRepository<PaymentMethod>();
            _mapper = mapper;
        }
        public async Task<PaymentMethodDTO> CreateAsync(PaymentMethodDTO newEntity)
        {
            try
            {
                var exists = await _repository.Get()
                  .AnyAsync(x => x.PaymentMethodName.ToUpper().Trim() == newEntity.PaymentMethodName.ToUpper().Trim());

                if (exists)
                    throw new DuplicateItemException(ExceptionMessage(newEntity.PaymentMethodName));

                var entity = new PaymentMethod
                {
                    Id = default,
                    PaymentMethodName = newEntity.PaymentMethodName.Trim(),
                };

                await _repository.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                return _mapper.Map<PaymentMethodDTO>(entity);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        public async Task<ICollection<PaymentMethodDTO>> GetAllAsync()
        {
            try
            {
                return _mapper.Map<ICollection<PaymentMethodDTO>>(await _repository.GetAllAsync());
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        public async Task<PaymentMethodDTO> GetByIdAsync(int id)
        {
            try
            {
                return _mapper.Map<PaymentMethodDTO>(await _repository.GetByIdAsync(id)) ??
                    throw new InvalidIdException(ExceptionMessage(id));
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        public async Task<PaymentMethodDTO> UpdateAsync(PaymentMethodDTO editEntity)
        {
            try
            {
                var currentEntity = await _repository.GetByIdAsync(editEntity.Id) ??
                    throw new InvalidIdException(ExceptionMessage(editEntity.Id));

                var tagExists = await _repository.Get()
                    .AnyAsync(x => x.PaymentMethodName.ToUpper().Trim() == editEntity.PaymentMethodName.ToUpper().Trim());

                if (tagExists)
                    throw new DuplicateItemException(ExceptionMessage(editEntity.PaymentMethodName));

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
                int idt when value is int => $"Статус з id: {idt} ще/вже не існує!",
                string namet when value is string => $"Статус з назвою {namet} вже існує",
                _ => "Something has gone wrong"
            };
    }
}
