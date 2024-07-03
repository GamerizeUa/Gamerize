using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Admin;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
    public class DeliveryMethodService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<DeliveryMethod> _repository;
        private readonly IMapper _mapper;

        public DeliveryMethodService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _repository = _unitOfWork.GetRepository<DeliveryMethod>();
            _mapper = mapper;
        }
        public async Task<DeliveryMethodDTO> CreateAsync(DeliveryMethodDTO newEntity)
        {
            try
            {
                var exists = await _repository.Get()
                  .AnyAsync(x => x.DeliveryMethodName.ToUpper().Trim() == newEntity.DeliveryMethodName.ToUpper().Trim());

                if (exists)
                    throw new DuplicateItemException(ExceptionMessage(newEntity.DeliveryMethodName));

                var entity = new DeliveryMethod
                {
                    Id = default,
                    DeliveryMethodName = newEntity.DeliveryMethodName.Trim(),
                };

                await _repository.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                return _mapper.Map<DeliveryMethodDTO>(entity);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        public async Task<ICollection<DeliveryMethodDTO>> GetAllAsync()
        {
            try
            {
                return _mapper.Map<ICollection<DeliveryMethodDTO>>(await _repository.GetAllAsync());
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        public async Task<DeliveryMethodDTO> GetByIdAsync(int id)
        {
            try
            {
                return _mapper.Map<DeliveryMethodDTO>(await _repository.GetByIdAsync(id)) ??
                    throw new InvalidIdException(ExceptionMessage(id));
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        public async Task<DeliveryMethodDTO> UpdateAsync(DeliveryMethodDTO editEntity)
        {
            try
            {
                var currentEntity = await _repository.GetByIdAsync(editEntity.Id) ??
                    throw new InvalidIdException(ExceptionMessage(editEntity.Id));

                var tagExists = await _repository.Get()
                    .AnyAsync(x => x.DeliveryMethodName.ToUpper().Trim() == editEntity.DeliveryMethodName.ToUpper().Trim());

                if (tagExists)
                    throw new DuplicateItemException(ExceptionMessage(editEntity.DeliveryMethodName));

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
