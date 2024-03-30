using Gamerize.BLL.Models.Interfaces;
using Gamerize.DAL.Entities.Shop;

namespace Gamerize.BLL.Models
{
	public class ProductFullDTO : IEntity
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public decimal Price { get; set; }
		public int MinPlayers { get; set; }
		public int MaxPlayers { get; set; }
		public int MinAge { get; set; }
		public int MinGameTimeMinutes { get; set; }
		public int MaxGameTimeMinutes { get; set; }
		public LanguageDTO Language { get; set; }
		public CategoryDTO Category { get; set; }
		public GenreDTO Genre { get; set; }
		public ThemeDTO Theme { get; set; }
        public PuzzleDTO Puzzle { get; set; }
        public MindGamesDTO MindGames { get; set; }

        public ICollection<FeedbackDTO> Feedbacks { get; set; }
		public ICollection<TagDTO> Tags { get; set; }
		public ICollection<ImageDTO> Images { get; set; }
	}
}
