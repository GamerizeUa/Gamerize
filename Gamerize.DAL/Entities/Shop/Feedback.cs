using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.DAL.Entities.Shop
{
	public class Feedback
	{
		public int Id { get; set; }
		public required string CustomerName { get; set; }
		[MaxLength(1500), Column(TypeName = "text")]
		public required string Text { get; set; }
		public required DateTime CreatedDate { get; set; }
		[Column(TypeName = "tinyint")]
		public required int Rate { get; set; }

		public required int ProductId { get; set; }
		public virtual Product Product { get; set; }
	}
}
