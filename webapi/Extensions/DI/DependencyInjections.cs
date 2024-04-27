using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.Repositories;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.BLL.Services;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Gamerize.DAL.UnitOfWork;
using DiscountCouponService = Gamerize.BLL.Services.DiscountCouponService;

namespace webapi.Extensions.DI
{
	public static class DependencyInjections
	{
		public static void AddDependencyInjections(this IServiceCollection services)
		{
			services.AddScoped(typeof(IRepository<>), typeof(GenericRepository<>));
			services.AddScoped<IUnitOfWork, UnitOfWork>();
			
			services.AddTransient(typeof(IService<,>), typeof(GenericService<,>));
			services.AddTransient<CategorySevice>();
			services.AddTransient<TagService>();
			services.AddTransient<ThemeService>();
			services.AddTransient<LanguageService>();
			services.AddTransient<GenreService>();
			services.AddTransient<ProductService>();
			services.AddTransient<QuestionService>();
			services.AddTransient<DiscountSevice>();
			services.AddTransient<DiscountCouponService>();
			services.AddTransient<PuzzleService>();
			services.AddTransient<MindGamesService>();
			services.AddTransient<ProfileService>();
		}
	}
}
