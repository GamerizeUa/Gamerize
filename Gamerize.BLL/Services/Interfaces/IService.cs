using System.Linq.Expressions;

namespace Gamerize.BLL.Services.Interfaces
{
	public interface IService<TIn, TOut>
		where TIn : class
		where TOut : class
	{
		Task<ICollection<TOut>> GetAllAsync();
		Task<TOut> GetByIdAsync(int id);
		Task CreateAsync(TOut entity);
		Task UpdateAsync(TOut entity, object id);
		Task DeleteAsync(TOut entity);
		Task<ICollection<TOut>> FindAsync(Expression<Func<TIn, bool>> predicate);
	}
}
