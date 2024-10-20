﻿using Gamerize.DAL.Specifications;
using System.Linq.Expressions;

namespace Gamerize.BLL.Services.Interfaces
{
	public interface IService<TIn, TOut>
		where TIn : class
		where TOut : class
	{
		Task<ICollection<TOut>> GetAllAsync(ISpecification<TIn>? spec = null);
		Task<TOut> GetByIdAsync(int id);
		Task CreateAsync(TOut entity);
		Task UpdateAsync(TOut entity, object id);
		Task DeleteAsync(object id);
		Task<ICollection<TOut>> FindAsync(Expression<Func<TIn, bool>> predicate);
	}
}
