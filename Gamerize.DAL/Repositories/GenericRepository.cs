using Gamerize.DAL.Contexts;
using Gamerize.DAL.Repositories.Interfaces;
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
			try
			{
				_context.Set<TEntity>().Add(entity);
			}
			catch (DbUpdateException ex)
			{
				throw new ArgumentException(ex.Message);
			}
		}
		public async Task AddAsync(TEntity entity)
		{
			try
			{
				await _context.Set<TEntity>().AddAsync(entity);
			}
			catch (DbUpdateException ex)
			{
				throw new ArgumentException($"Update failed!{entity}",ex);
			}
		}
		public void AddRange(ICollection<TEntity> entities)
		{
			try
			{
				_context.Set<TEntity>().AddRange(entities);
			}
			catch (DbUpdateException ex)
			{
				throw new ArgumentException(ex.Message);
			}
		}
		public async Task AddRangeAsync(ICollection<TEntity> entities)
		{
			try
			{
				await _context.AddRangeAsync(entities);
			}
			catch (DbUpdateException ex)
			{
				throw new ArgumentException(ex.Message);
			}
		}
		public void DeleteById(object id)
		{
			try
			{
				var entity = _context.Set<TEntity>().Find(id);
				_context.Set<TEntity>().Remove(entity);
			}
			catch (DbUpdateException ex)
			{
				throw new ArgumentException(ex.Message);
			}
		}
		public async Task DeleteByIdAsync(object id)
		{
			var entity = await _context.Set<TEntity>().FindAsync(id) ?? throw new ArgumentException($"Invalid Id: {id}");
				_context.Set<TEntity>().Remove(entity);
		}
		public void Delete(TEntity entity)
		{
			try
			{
				_context.Set<TEntity>().Remove(entity);
			}
			catch (DbUpdateException ex)
			{
				throw new ArgumentException(ex.Message);
			}
		}
		public async Task DeleteAsync(TEntity entity)
		{
			try
			{
				await Task.Run(() => _context.Set<TEntity>().Remove(entity));
			}
			catch (DbUpdateException ex)
			{
				throw new ArgumentException(ex.Message);
			}
		}
		public void DeleteRange(ICollection<TEntity> entities)
		{
			try
			{
				_context.Set<TEntity>().RemoveRange(entities);
			}
			catch (DbUpdateException ex)
			{
				throw new ArgumentException(ex.Message);
			}
		}
		public async Task DeleteRangeAsync(ICollection<TEntity> entities)
		{
			try
			{
				await Task.Run(() => _context.Set<TEntity>().RemoveRange(entities));
			}
			catch (DbUpdateException ex)
			{
				throw new ArgumentException(ex.Message);
			}
		}
		public ICollection<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
		{
			return _context.Set<TEntity>().Where(predicate).ToList();
		}
		public async Task<ICollection<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate)
		{
			return await _context.Set<TEntity>().Where(predicate).ToListAsync();
		}
		public ICollection<TEntity> GetAll()
		{
			return _context.Set<TEntity>().ToList();
		}
		public async Task<ICollection<TEntity>> GetAllAsync()
		{
			return await _context.Set<TEntity>().ToListAsync();
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
			try
			{
				_context.Set<TEntity>().Update(entity);
			}
			catch (DbUpdateException ex)
			{
				throw new ArgumentException(ex.Message, ex);
			}
		}
		public async Task UpdateAsync(TEntity entity)
		{
			try
			{
				await Task.Run(() => _context.Set<TEntity>().Update(entity));
			}
			catch (DbUpdateException ex)
			{
				throw new ArgumentException(ex.Message, ex);
			}
		}
		public void UpdateRange(ICollection<TEntity> entities)
		{
			try
			{
				_context.Set<TEntity>().UpdateRange(entities);
			}
			catch (DbUpdateException ex)
			{
				throw new ArgumentException(ex.Message);
			}
		}
		public async Task UpdateRangeAsync(ICollection<TEntity> entities)
		{
			try
			{
				await Task.Run(() => _context.Set<TEntity>().UpdateRange(entities));
			}
			catch (DbUpdateException ex)
			{
				throw new ArgumentException(ex.Message);
			}
		}
	}
}
