using System.ComponentModel.DataAnnotations;

namespace Gamerize.DAL.Entities.Shop
{
	public class Tag
	{
		public int Id { get; set; }
		[MaxLength(30)]
		public string Name { get; set; }
		public virtual ICollection<Product> Products { get; set; }
	}
}
