namespace Gamerize.DAL.Entities.Shop
{
	public class DiscountCoupon
	{
		public int Id { get; set; }
		public string Code { get; set; }
		public DateTime ActiveFrom { get; set; }
		public DateTime ActiveTo { get; set; }
	}
}
