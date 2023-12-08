using Gamerize.BLL.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.BLL.Models
{
	public class ProductNewDTO : IEntity
	{
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Description { get; set; }
		[Required, Column(TypeName = "decimal(6,2)")]
		public decimal Price { get; set; }
		[Required, Range(2, 30)]
		public int MinPlayers { get; set; }
		[Required, Range(2, 30)]
		public int MaxPlayers { get; set; }
		[Required, Range(0, 21)]
		public int MinAge { get; set; }
		[Required, Range(5, 240)]
		public int MinGameTimeMinutes { get; set; }
		[Required, Range(5, 240)]
		public int MaxGameTimeMinutes { get; set; }
		[Required]
		public int LanguageId { get; set; }
		[Required]
		public int CategoryId { get; set; }
		[Required]
		public int GenreId { get; set; }
		[Required]
		public int ThemeId { get; set; }
		public ICollection<IFormFile> Images { get; set; } = new List<IFormFile>();
		public int[] TagsId { get; set; } = Array.Empty<int>();
	}
}
