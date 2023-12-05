using Gamerize.DAL.Specifications;
using System.Linq.Expressions;

namespace Gamerize.DAL.Repositories.Interfaces
{
	public interface IRepository<TEntity> where TEntity : class
	{
		ICollection<TEntity> GetAll(ISpecification<TEntity>? spec = null);
		Task<ICollection<TEntity>> GetAllAsync(ISpecification<TEntity>? spec = null);
		TEntity? GetById(object id);
		Task<TEntity?> GetByIdAsync(object id);
		void Add(TEntity entity);
		Task AddAsync(TEntity entity);
		void AddRange(ICollection<TEntity> entities);
		Task AddRangeAsync(ICollection<TEntity> entities);
		void Update(TEntity entity);
		Task UpdateAsync(TEntity entity);
		void UpdateRange(ICollection<TEntity> entities);
		Task UpdateRangeAsync(ICollection<TEntity> entities);
		void Delete(TEntity entity);
		Task DeleteAsync(TEntity entity);
		void DeleteById(object id);
		Task DeleteByIdAsync(object id);
		void DeleteRange(ICollection<TEntity> entities);
		Task DeleteRangeAsync(ICollection<TEntity> entities);
		ICollection<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
		Task<ICollection<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate);
	}
}
