using Gamerize.DAL.Specifications;
using System.Linq.Expressions;

namespace Gamerize.BLL.Specifications
{
	public abstract class Specification<TEntity> : ISpecification<TEntity>
	{
		public Expression<Func<TEntity, bool>> Criteria { get; private set; }
		public List<Expression<Func<TEntity, object>>> Includes { get; private set; } = new();
		public Expression<Func<TEntity, object>> OrderBy { get; private set; }
		public Expression<Func<TEntity, object>> OrderByDescending { get; private set; }

		protected Specification<TEntity> Where(Expression<Func<TEntity, bool>> criteria)
		{
			Criteria = criteria;
			return this;
		}
		protected Specification<TEntity> Include(Expression<Func<TEntity, object>> include)
		{
			Includes.Add(include);
			return this;
		}
		protected Specification<TEntity> OrderByFunc(Expression<Func<TEntity, object>> orederBy)
		{
			OrderBy = orederBy;
			return this;
		}
		protected Specification<TEntity> OrderByDescendingFunc(Expression<Func<TEntity, object>> orderByDescending)
		{
			OrderByDescending = orderByDescending;
			return this;
		}
	}
}
