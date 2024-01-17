using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.DAL.Entities.Admin
{
	public class Order
	{
		public int Id { get; set; }
		public required int UserId { get; set; }
		public virtual User User { get; set; }
		public required DateTime CreatedAt { get; set; }
		public DateTime? UpdatedAd { get; set; }
		public DateTime? ClosedAt { get; set; }
		[Column(TypeName = "tinyint")]
		public required int OrderStatusId { get; set; }
		public virtual OrderStatus Status { get; set; }

		public virtual ICollection<OrderItem> OrderItems { get; set; }
	}
}
