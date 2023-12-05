using Gamerize.DAL.Contexts;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.Specifications;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Gamerize.DAL.Repositories
{
	public class GenericRepository<TEntity> : IRepository<TEntity> where TEntity : class
	{
		private readonly ApiDbContext _context;

		public GenericRepository(ApiDbContext context)
		{
			_context = context;
		}

		public void Add(TEntity entity)
		{
			_context.Set<TEntity>().Add(entity);
		}
		public async Task AddAsync(TEntity entity)
		{
			await _context.Set<TEntity>().AddAsync(entity);
		}
		public void AddRange(ICollection<TEntity> entities)
		{
			_context.Set<TEntity>().AddRange(entities);
		}
		public async Task AddRangeAsync(ICollection<TEntity> entities)
		{
			await _context.AddRangeAsync(entities);
		}
		public void DeleteById(object id)
		{
			var entity = _context.Set<TEntity>().Find(id) ?? throw new ArgumentException($"Invalid Id: {id}");
			Delete(entity);
		}
		public async Task DeleteByIdAsync(object id)
		{
			var entity = await _context.Set<TEntity>().FindAsync(id) ?? throw new ArgumentException($"Invalid Id: {id}");
			Delete(entity);
		}
		public void Delete(TEntity entity)
		{
			_context.Set<TEntity>().Remove(entity);
		}
		public async Task DeleteAsync(TEntity entity)
		{
			await Task.Run(() => Delete(entity));
		}
		public void DeleteRange(ICollection<TEntity> entities)
		{
			_context.Set<TEntity>().RemoveRange(entities);
		}
		public async Task DeleteRangeAsync(ICollection<TEntity> entities)
		{
			await Task.Run(() => _context.Set<TEntity>().RemoveRange(entities));
		}
		public ICollection<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
		{
			return _context.Set<TEntity>().Where(predicate).ToList();
		}
		public async Task<ICollection<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate)
		{
			return await _context.Set<TEntity>().Where(predicate).ToListAsync();
		}
		public ICollection<TEntity> GetAll(ISpecification<TEntity>? spec = null)
		{
			IQueryable<TEntity> query = _context.Set<TEntity>().AsNoTracking();
			if (spec is not null && spec.Criteria is not null)
			{
				query = query.Where(spec.Criteria);
				query = spec.Includes.Aggregate(query, (current, include) => current.Include(include));
			}
			return query.ToList();
		}
		public async Task<ICollection<TEntity>> GetAllAsync(ISpecification<TEntity>? spec = null)
		{
			IQueryable<TEntity> query = _context.Set<TEntity>().AsNoTracking();
			if (spec is not null && spec.Criteria is not null)
			{
				query = query.Where(spec.Criteria);
				query = spec.Includes.Aggregate(query, (current, include) => current.Include(include));
			}
			return await query.ToListAsync();
		}
		public TEntity? GetById(object id)
		{
			return _context.Set<TEntity>().Find(id);
		}
		public async Task<TEntity?> GetByIdAsync(object id)
		{
			return await _context.Set<TEntity>().FindAsync(id);
		}
		public void Update(TEntity entity)
		{
			_context.Set<TEntity>().Update(entity);
		}
		public async Task UpdateAsync(TEntity entity)
		{
			await Task.Run(() => _context.Set<TEntity>().Update(entity));
		}
		public void UpdateRange(ICollection<TEntity> entities)
		{
			_context.Set<TEntity>().UpdateRange(entities);
		}
		public async Task UpdateRangeAsync(ICollection<TEntity> entities)
		{
			await Task.Run(() => _context.Set<TEntity>().UpdateRange(entities));
		}
	}
}
