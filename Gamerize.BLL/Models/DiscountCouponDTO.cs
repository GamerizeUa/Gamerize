using Gamerize.BLL.Models.Interfaces;

namespace Gamerize.BLL.Models
{
	public class DiscountCouponDTO : IEntity
	{
		public int Id { get; set; }
		public string Code { get; set; }
		public DateTime ActiveFrom { get; set; }
		public DateTime? ActiveTo { get; set; }
		public double Discount { get; set; }
		
	}
	
}
