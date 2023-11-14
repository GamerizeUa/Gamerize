using Gamerize.DAL.Repositories.Interfaces;

namespace Gamerize.DAL.UnitOfWork.Interfaces
{
	public interface IUnitOfWork : IDisposable
	{
		IRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
		void SaveChanges();
		Task SaveChangesAsync();
	}
}
