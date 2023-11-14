namespace Gamerize.DAL.Entities.Shop
{
	public class Language
	{
		public int Id { get; set; }
		public string Value { get; set; }

		public virtual ICollection<Product> Products { get; set; }
    }
}
