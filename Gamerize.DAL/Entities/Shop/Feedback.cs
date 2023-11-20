using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.DAL.Entities.Shop
{
	public class Feedback
	{
		public int Id { get; set; }
		public string CustomerName { get; set; }
		[MaxLength(1500), Column(TypeName = "text")]
		public string Text { get; set; }
		public DateTime CreatedDate { get; set; }
		[Column(TypeName = "tinyint")]
		public int Rate { get; set; }

		public int ProductId { get; set; }
		public virtual Product Product { get; set; }
	}
}
