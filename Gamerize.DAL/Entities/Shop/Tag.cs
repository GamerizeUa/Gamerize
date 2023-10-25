namespace Gamerize.DAL.Entities.Shop
{
	public class Tag
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public ICollection<Product> Products { get; set; }
	}
}
