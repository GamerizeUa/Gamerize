using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Admin;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
    public class UserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<User> _repository;
        private readonly IMapper _mapper;

        public UserService(IUnitOfWork unitOfWork, IRepository<User> repository, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<ICollection<ProfileDTO>> GetUserAsync()
        {
            try
            {
                return _mapper.Map<ICollection<ProfileDTO>>(await _repository.GetAllAsync());
            }
            catch (DbUpdateException ex) 
            {
                throw new ServerErrorException(ex.Message, ex);
            } 
        }

        public async Task<ProfileDTO> GetUserByIdAsync(int id)
        {
            try
            {
                return _mapper.Map<ProfileDTO>(await _repository.GetByIdAsync(id)) ?? 
                    throw new InvalidIdException(ExceptionMessage(id));
            }
            catch(DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        private string ExceptionMessage(object? value = null) =>
            value switch
            {
                int idt when value is int => $"Користувача з id: {idt} не знайдено!",
                _ => "Something has gone wrong!"
            };
    }
}
