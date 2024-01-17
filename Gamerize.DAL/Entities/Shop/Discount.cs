namespace Gamerize.DAL.Entities.Shop
{
	public class Discount
	{
		public int Id { get; set; }
		public required int ProductId { get; set; }
		public virtual Product Product { get; set; }
		public required double CurrentDiscount { get; set; }
		public DateTime? EndDiscount { get; set; }
	}
}
