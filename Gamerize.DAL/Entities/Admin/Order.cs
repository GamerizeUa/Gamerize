using Gamerize.DAL.Entities.Shop;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.DAL.Entities.Admin
{
	public class Order
	{
		public int Id { get; set; }

		public int? UserId { get; set; }
		public virtual User? User { get; set; }

		public string? Comment { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public required decimal TotalPrice { get; set; }
        public required DateTime CreatedAt { get; set; }
		public DateTime? UpdatedAd { get; set; }
		public DateTime? ClosedAt { get; set; }

		[Column(TypeName = "tinyint")]
		public required int OrderStatusId { get; set; }
		public virtual OrderStatus Status { get; set; }

        [Column(TypeName = "tinyint")]
        public required int DeliveryMethodId { get; set; }
        public virtual DeliveryMethod DeliveryMethod { get; set; }

        [Column(TypeName = "tinyint")]
        public required int PaymentMethodId { get; set; }
        public virtual PaymentMethod PaymentMethod { get; set; }

        public int? DiscountCouponId { get; set; }
        public virtual DiscountCoupon? DiscountCoupon { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; }
	}
}
