using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.BLL.Models
{
	public class ProductShortDTO
	{
		public int Id { get; set; }
		[Required, MaxLength(70)]
		public string Name { get; set; }
		[Required, Column(TypeName = "decimal(6,2)")]
		public decimal Price { get; set; }
		[Required]
		public int MaxPlayers { get; set; }
		[Required]
		public int MinAge { get; set; }
		[Required]
		public int GameTimeMinutes { get; set; }
		public double GameRateAvg { get; set; }
	}
}
