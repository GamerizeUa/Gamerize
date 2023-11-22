using Gamerize.DAL.Entities.Admin;
using Gamerize.DAL.Entities.Shop;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.DAL.Contexts
{
	public class ApiDbContext : IdentityDbContext
	{
		#region ShopDatas
		public virtual DbSet<Category> Categories { get; set; }
		public virtual DbSet<DiscountCoupon> DiscountCoupons { get; set; }
		public virtual DbSet<Feedback> Feedbacks { get; set; }
		public virtual DbSet<Genre> Genres { get; set; }
		public virtual DbSet<Language> Languages { get; set; }
		public virtual DbSet<Product> Products { get; set; }
		public virtual DbSet<Tag> Tags { get; set; }
		public virtual DbSet<WishList> WishLists { get; set; }
		public virtual DbSet<Theme> Themes { get; set; }
		public virtual DbSet<Image> Images { get; set; }
		#endregion
		#region AdminDatas
		public virtual DbSet<User> Users { get; set; }
		public virtual DbSet<Role> Roles { get; set; }
		public virtual DbSet<OrderStatus> OrderStatuses { get; set; }
		public virtual DbSet<OrderItem> OrderItems { get; set; }
		public virtual DbSet<Order> Orders { get; set; }
		#endregion
		public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) { }
	}
}
