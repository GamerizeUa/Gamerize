using System.Linq.Expressions;

namespace Gamerize.DAL.Repositories.Interfaces
{
	public interface IRepository<TEntity> where TEntity : class
	{
		ICollection<TEntity> GetAll();
		Task<ICollection<TEntity>> GetAllAsync();
		TEntity GetById(int id);
		Task<TEntity> GetByIdAsync(int id);
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
		void DeleteRange(ICollection<TEntity> entities);
		Task DeleteRangeAsync(ICollection<TEntity> entities);
		ICollection<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
		Task<ICollection<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate);
	}
}
