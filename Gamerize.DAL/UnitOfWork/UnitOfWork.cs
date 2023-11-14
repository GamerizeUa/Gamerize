using Gamerize.DAL.Contexts;
using Gamerize.DAL.Repositories;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;

namespace Gamerize.DAL.UnitOfWork
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly ApiDbContext _context;
		private Dictionary<Type, object> _repositories;
		public UnitOfWork(ApiDbContext context)
		{
			_context = context;
			_repositories = new Dictionary<Type, object>();
		}

		public IRepository<TEntity> GetRepository<TEntity>() where TEntity : class
		{
			if (_repositories.ContainsKey(typeof(TEntity)))
			{
				return (IRepository<TEntity>)_repositories[typeof(TEntity)];
			}

			var repository = new GenericRepository<TEntity>(_context);
			_repositories.Add(typeof(TEntity), repository);
			return repository;
		}

		public void SaveChanges() => _context.SaveChanges();
		public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
		public void Dispose() => _context.Dispose();
		public async Task DisposeAsync() => await _context.DisposeAsync();
	}
}
