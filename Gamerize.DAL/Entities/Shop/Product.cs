using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gamerize.DAL.Entities.Shop
{
	public class Product
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		public string Description { get; set; }
		[Required]
		[Column(TypeName = "decimal(6,2)")]
		public decimal Price { get; set; }
		public int MinPlayers { get; set; }
		public int MaxPlayers { get; set; }
		public int MinAge { get; set; }
		public int GameTimeMinutes { get; set; }
		public int LanguageId { get; set; }
		public virtual Language Language { get; set; }
		public int CategoryId { get; set; }
		public virtual Category Category { get; set; }

		public virtual ICollection<Feedback> Feedbacks { get; set; }
		public virtual ICollection<Tag> Tags { get; set; }
		public virtual ICollection<Genre> Genres { get; set; }
	}
}
