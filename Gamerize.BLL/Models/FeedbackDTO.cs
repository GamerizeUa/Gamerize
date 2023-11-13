using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
	public class FeedbackDTO
	{
		public int Id { get; set; }
		[Required, MaxLength(30)]
		public string CustomerName { get; set; }
		[Required, MaxLength(1500)]
		public string Text { get; set; }
		public DateTime CreatedDate { get; set; }
		public int Rate { get; set; }
		public int ProductId { get; set; }
	}
}
