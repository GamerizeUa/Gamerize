using Gamerize.BLL.Models.Interfaces;

namespace Gamerize.BLL.Models
{
	public class DiscountDTO : IEntity
	{
		public int Id { get; set; }
		public int ProductId { get; set; }
		public double CurrentDiscount { get; set; }
		public DateTime? EndDiscount { get; set; }
	}
}
