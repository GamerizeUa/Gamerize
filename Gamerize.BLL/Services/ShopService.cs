using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.UnitOfWork.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gamerize.BLL.Services
{
	public class ShopService
	{
		private readonly IUnitOfWork _unitOfWork;

		public ShopService(IUnitOfWork unitOfWork)
        {
			_unitOfWork = unitOfWork;
		}

		public ICollection<Category> GetCategories()
		{
			var categoryRepository = _unitOfWork.GetRepository<Category>();
			return categoryRepository.GetAll();
		}

		public async Task<IEnumerable<Category>> GetCategoriesAsync()
		{
			var categoryRepository = _unitOfWork.GetRepository<Category>();
			return await categoryRepository.GetAllAsync();
		}
    }
}
