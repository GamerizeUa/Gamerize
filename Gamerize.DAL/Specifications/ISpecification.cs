using System.Linq.Expressions;

namespace Gamerize.DAL.Specifications
{
	public interface ISpecification<TEntity>
	{
		Expression<Func<TEntity, bool>> Criteria { get; }
		List<Expression<Func<TEntity, object>>> Includes { get; }

		Expression<Func<TEntity, object>> OrderBy { get; }
		Expression<Func<TEntity, object>> OrderByDescending { get; }
		ISpecification<TEntity> And(ISpecification<TEntity> specification);
		ISpecification<TEntity> Or(ISpecification<TEntity> specification);
		ISpecification<TEntity> Not();
		int? Skip { get; }
		int? Take { get; }
	}
}
