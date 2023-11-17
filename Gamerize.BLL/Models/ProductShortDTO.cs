using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.BLL.Models
{
	public class ProductShortDTO
	{
		public int Id { get; set; }
		[Required, MaxLength(50)]
		public string Name { get; set; }
		[Required, Column(TypeName = "decimal(6,2)")]
		public decimal Price { get; set; }
		[Required, Range(2,50)]
		public int MaxPlayers { get; set; }
		[Required, Range(0,21)]
		public int MinAge { get; set; }
		[Required, Range(5,240)]
		public int GameTimeMinutes { get; set; }
		public double GameRateAvg { get; set; }
	}
}
