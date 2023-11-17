using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
	public class FeedbackDTO
	{
		public int Id { get; set; }
		[Required, MaxLength(30)]
		public string CustomerName { get; set; }
		[Required, MinLength(50), MaxLength(1500)]
		public string Text { get; set; }
		public DateTime CreatedDate { get; set; }
		[Required, Range(0, 5)]
		public int Rate { get; set; }
		[Required]
		public int ProductId { get; set; }
	}
}
