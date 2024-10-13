using Gamerize.DAL.Entities.Shop;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.DAL.Entities.Admin
{
	public class Order
	{
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? Comment { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public required decimal TotalPrice { get; set; }
        public required double TotalDiscount { get; set; }
        public required DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAd { get; set; }
        public DateTime? ClosedAt { get; set; }
        [Column(TypeName = "tinyint")]
        public required int OrderStatusId { get; set; }
        [Column(TypeName = "tinyint")]
        public required int DeliveryMethodId { get; set; }
        [Column(TypeName = "tinyint")]
        public required int PaymentMethodId { get; set; }
        public int? DiscountCouponId { get; set; }

        public List<int> ProductId { get; set; } = new List<int>();
        public List<int> Quantity { get; set; } = new List<int>();

        public int? UnregisteredUserId { get; set; }
        public virtual UnregisteredUser? UnregisteredUser { get; set; }

        public virtual OrderStatus? Status { get; set; }
        public virtual DeliveryMethod? DeliveryMethod { get; set; }
        public virtual PaymentMethod? PaymentMethod { get; set; }
    }
}