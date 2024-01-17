using Gamerize.DAL.Entities.Shop;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.DAL.Entities.Admin
{
	public class OrderItem
	{
		public int Id { get; set; }
		public required int OrderId { get; set; }
		public virtual Order Order { get; set; }
		public required int ProductId { get; set; }
		public virtual Product Product { get; set; }

		public required int Quantity { get; set; }
		[Column(TypeName = "decimal(6,2)")]
		public required decimal UnitPrice { get; set; }
	}
}
