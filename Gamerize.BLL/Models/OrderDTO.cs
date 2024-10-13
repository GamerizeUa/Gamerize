using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAd { get; set; }
        public DateTime? ClosedAt { get; set; }
        public string? Comment { get; set; }
        [Required]
        public decimal TotalPrice { get; set; }
        [Required]
        public double TotalDiscount { get; set; }
        [Required]
        public int OrderStatusId { get; set; }
        public int? DiscountCouponId { get; set; }
        [Required]
        public int DeliveryMethodId { get; set; }
        [Required]
        public int PaymentMethodId { get; set; }

        public List<int> ProductId { get; set; } = new List<int>();
        public List<int> Quantity { get; set; } = new List<int>();

        public int? UnregisteredUserId { get; set; }
        public virtual UnregisteredUserDTO UnregisteredUser { get; set; }

        public virtual StatusDTO? Status { get; set; }
        public virtual DeliveryMethodDTO? DeliveryMethod { get; set; }
        public virtual PaymentMethodDTO? PaymentMethod { get; set; }
    }
}