namespace Gamerize.BLL.Models
{
	public class DiscountCouponDTO
	{
		public int Id { get; set; }
		public string Code { get; set; }
		public DateTime ActiveFrom { get; set; }
		public DateTime? ActiveTo { get; set; }
	}
}
