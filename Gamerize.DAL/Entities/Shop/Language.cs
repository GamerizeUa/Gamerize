using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gamerize.DAL.Entities.Shop
{
	public class Language
	{
		[Key, Column(TypeName = "tinyint")]
		public int Id { get; set; }
		public string Value { get; set; }

		public virtual ICollection<Product> Products { get; set; }
    }
}
