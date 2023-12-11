using Gamerize.BLL.Models.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
	public class DiscountDTO : IEntity
	{
		public int Id { get; set; }
		public int ProductId { get; set; }
		[Range(0,1)]
		public double CurrentDiscount { get; set; }
		public DateTime? EndDiscount { get; set; }
	}
}
