using Gamerize.DAL.Entities.Admin;

namespace Gamerize.DAL.Entities.Shop
{
	public class WishList
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public virtual User User { get; set; }
		public int ProductId { get; set; }
		public virtual Product Product { get; set; }

	}
}
