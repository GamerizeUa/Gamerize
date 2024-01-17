using System.ComponentModel.DataAnnotations;

namespace Gamerize.DAL.Entities.Shop
{
	public class Question
	{
		public int Id { get; set; }
		[MaxLength(50)]
		public required string UserName { get; set; }
		[MinLength(50), MaxLength(1500)]
		public required string Text { get; set; }
		public required DateTime DateTime { get; set; }
		public required bool IsAnswered { get; set; }

		public required int ProductId { get; set; }
		public virtual Product Product { get; set; }

		public virtual Answer? Answer { get; set; }
	}
}
