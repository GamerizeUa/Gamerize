using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.DAL.Entities.Shop
{
	public class Product
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		[Column(TypeName = "decimal(6,2)")]
		public decimal Price { get; set; }
		[Column(TypeName = "tinyint")]
		public int MinPlayers { get; set; }
		[Column(TypeName = "tinyint")]
		public int MaxPlayers { get; set; }
		[Column(TypeName = "tinyint")]
		public int MinAge { get; set; }
		[Column(TypeName = "tinyint")]
		public int GameTimeMinutes { get; set; }
		public int LanguageId { get; set; }
		public virtual Language Language { get; set; }
		public int CategoryId { get; set; }
		public virtual Category Category { get; set; }
		public int GenreId { get; set; }
		public virtual Genre Genre { get; set; }
		public int ThemeId { get; set; }
		public virtual Theme Theme { get; set; }

		public virtual ICollection<Feedback> Feedbacks { get; set; }
		public virtual ICollection<Tag> Tags { get; set; }
	}
}
