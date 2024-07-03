using Gamerize.BLL.Models.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
    public class OrderItemDTO : IEntity
    {
        public int Id { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public decimal UnitPrice { get; set; }
        [Required]
        public int ProductId { get; set; }

        public virtual ProductFullDTO Product { get; set; }
    }
}