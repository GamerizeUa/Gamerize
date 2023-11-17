namespace Gamerize.DAL.Entities.Admin
{
	public class Order
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public virtual User User { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime? UpdatedAd { get; set; }
		public DateTime? ClosedAt { get; set; }
		public int OrderStatusId { get; set; }
		public virtual OrderStatus Status { get; set; }

		public virtual ICollection<OrderItem> OrderItems { get; set; }
	}
}
