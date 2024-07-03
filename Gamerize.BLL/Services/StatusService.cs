using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Admin;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
    public class StatusService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<OrderStatus> _repository;
        private readonly IMapper _mapper;

        public StatusService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _repository = _unitOfWork.GetRepository<OrderStatus>();
            _mapper = mapper;
        }
        public async Task<StatusDTO> CreateAsync(StatusDTO newEntity)
        {
            try
            {
                var exists = await _repository.Get()
                  .AnyAsync(x => x.Status.ToUpper().Trim() == newEntity.Status.ToUpper().Trim());

                if (exists)
                    throw new DuplicateItemException(ExceptionMessage(newEntity.Status));

                var entity = new OrderStatus
                {
                    Id = default,
                    Status = newEntity.Status.Trim(),
                };

                await _repository.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                return _mapper.Map<StatusDTO>(entity);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        public async Task<ICollection<StatusDTO>> GetAllAsync()
        {
            try
            {
                return _mapper.Map<ICollection<StatusDTO>>(await _repository.GetAllAsync());
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        public async Task<StatusDTO> GetByIdAsync(int id)
        {
            try
            {
                return _mapper.Map<StatusDTO>(await _repository.GetByIdAsync(id)) ??
                    throw new InvalidIdException(ExceptionMessage(id));
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        public async Task<StatusDTO> UpdateAsync(StatusDTO editEntity)
        {
            try
            {
                var currentEntity = await _repository.GetByIdAsync(editEntity.Id) ??
                    throw new InvalidIdException(ExceptionMessage(editEntity.Id));

                var tagExists = await _repository.Get()
                    .AnyAsync(x => x.Status.ToUpper().Trim() == editEntity.Status.ToUpper().Trim());

                if (tagExists)
                    throw new DuplicateItemException(ExceptionMessage(editEntity.Status));

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
