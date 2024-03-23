using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.DAL.Entities.Shop
{
	public class Product
	{
		public int Id { get; set; }
		public required string Name { get; set; }
		[Column(TypeName = "text")]
		public required string Description { get; set; }
		[Column(TypeName = "decimal(6,2)")]
		public required decimal Price { get; set; }
		[Column(TypeName = "tinyint")]
		public required int MinPlayers { get; set; }
		[Column(TypeName = "tinyint")]
		public required int MaxPlayers { get; set; }
		[Column(TypeName = "tinyint")]
		public required int MinAge { get; set; }
		[Column(TypeName = "tinyint")]
		public required int MinGameTimeMinutes { get; set; }
		[Column(TypeName = "tinyint")]
		public required int MaxGameTimeMinutes { get; set; }
		[Column(TypeName = "tinyint")]
		public required int LanguageId { get; set; }
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
        //[Column(TypeName = "tinyint")]
        //public int PuzzleId { get; set; }
        //[Column(TypeName = "tinyint")]
        //public int MindGameID { get; set; }

        public virtual ICollection<Feedback> Feedbacks { get; set; }
		public virtual ICollection<Tag> Tags { get; set; }
		public virtual ICollection<Image> Images { get; set; }
		public virtual ICollection<Discount> Discounts { get; set; }
		public virtual ICollection<Question> Questions { get; set; }
	}
}
