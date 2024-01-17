using System.ComponentModel.DataAnnotations;

namespace Gamerize.DAL.Entities.Shop
{
	public class DiscountCoupon
	{
		public int Id { get; set; }
		public required string Code { get; set; }
		public required DateTime ActiveFrom { get; set; }
		public DateTime? ActiveTo { get; set; }
	}
}
