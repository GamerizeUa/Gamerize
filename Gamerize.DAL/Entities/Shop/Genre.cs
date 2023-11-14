namespace Gamerize.DAL.Entities.Shop
{
	public class Genre
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public ICollection<Product> Products { get; set; }
	}
}
