using AutoMapper;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.DAL.Specifications;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.Extensions.Logging;
using System.Linq.Expressions;

namespace Gamerize.BLL.Services
{
	public class GenericService<TIn, TOut> : IService<TIn, TOut>
		where TIn : class
		where TOut : class
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
		private readonly ILogger _logger;
		public GenericService(IUnitOfWork unitOfWork, IMapper mapper, ILogger<ShopService> logger)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
			_logger = logger;
		}
		public virtual async Task<ICollection<TOut>> GetAllAsync(ISpecification<TIn>? spec = null)
		{
			return _mapper.Map<ICollection<TOut>>(await _unitOfWork.GetRepository<TIn>().GetAllAsync(spec));
		}
		public virtual async Task<TOut> GetByIdAsync(int id)
		{
			return _mapper.Map<TOut>(await _unitOfWork.GetRepository<TIn>().GetByIdAsync(id));
		}
		public virtual async Task CreateAsync(TOut entity)
		{
			var create = _mapper.Map<TIn>(entity);
			await _unitOfWork.GetRepository<TIn>().AddAsync(create);
			await _unitOfWork.SaveChangesAsync();
		}
		public virtual async Task UpdateAsync(TOut entity, object id)
		{
			var search = await _unitOfWork.GetRepository<TIn>().GetByIdAsync(id) ?? throw new ArgumentNullException($"Entity by Id: {id} has not been found!");
			var upduted = _mapper.Map(entity, search);
			await _unitOfWork.GetRepository<TIn>().UpdateAsync(upduted);
			await _unitOfWork.SaveChangesAsync();
		}
		public virtual async Task DeleteAsync(object id)
		{
			try
			{
				await _unitOfWork.GetRepository<TIn>().DeleteByIdAsync(id);
				await _unitOfWork.SaveChangesAsync();
			}
			catch (ArgumentException ex)
			{
				_logger.LogError("DeleteAsync catched exception {ex}", ex.Message);
				throw new ArgumentException(ex.Message);
			}
		}
		public virtual async Task<ICollection<TOut>> FindAsync(Expression<Func<TIn, bool>> predicate)
		{
			return _mapper.Map<ICollection<TOut>>(await _unitOfWork.GetRepository<TIn>().FindAsync(predicate));
		}
	}
}
