namespace Gamerize.DAL.Entities.Shop
{
	public class Product
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public decimal Price { get; set; }
		public int MinPlayers { get; set; }
		public int MaxPlayers { get; set; }
		public int MinAge { get; set; }
		public int GameTimeMinutes { get; set; }
		public int LanguageId { get; set; }
		public Language Language { get; set; }
		public int CategoryId { get; set; }
		public Category Category { get; set; }

		public ICollection<Feedback> Feedbacks { get; set; }
		public ICollection<Tag> Tags { get; set; }
		public ICollection<Genre> Genres { get; set; }
	}
}
