namespace Gamerize.DAL.Entities.Shop
{
	public class Language
	{
		public int Id { get; set; }
		public string Value { get; set; }

		public ICollection<Product> Products { get; set; }
	}
}
