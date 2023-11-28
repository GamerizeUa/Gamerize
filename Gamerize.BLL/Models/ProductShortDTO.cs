using Gamerize.BLL.Models.Interfaces;
using Gamerize.DAL.Entities.Shop;

namespace Gamerize.BLL.Models
{
	public class ProductShortDTO : IEntity
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public decimal Price { get; set; }
		public int MaxPlayers { get; set; }
		public int MinAge { get; set; }
		public int GameTimeMinutes { get; set; }
		public double GameRateAvg { get; set; }
		public Image Image { get; set; }
	}
}
