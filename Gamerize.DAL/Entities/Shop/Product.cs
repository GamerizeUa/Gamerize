using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.DAL.Entities.Shop
{
	public class Product
	{
		public int Id { get; set; }
		public string Name { get; set; }
		[Column(TypeName = "text")]
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
		[Column(TypeName = "tinyint")]
		public int LanguageId { get; set; }
		public virtual Language Language { get; set; }
		[Column(TypeName = "tinyint")]
		public int CategoryId { get; set; }
		public virtual Category Category { get; set; }
		[Column(TypeName = "tinyint")]
		public int GenreId { get; set; }
		public virtual Genre Genre { get; set; }
		[Column(TypeName = "tinyint")]
		public int ThemeId { get; set; }
		public virtual Theme Theme { get; set; }

		public virtual ICollection<Feedback> Feedbacks { get; set; }
		public virtual ICollection<Tag> Tags { get; set; }
		public virtual ICollection<Image> Images { get; set; }
	}
}
