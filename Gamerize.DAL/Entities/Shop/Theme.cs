using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Gamerize.DAL.Entities.Shop
{
	public class Theme
	{
		[Key, Column(TypeName = "tinyint")]
		public int Id { get; set; }
		[MaxLength(100)]
		public string Name { get; set; }
		[Column(TypeName = "text")]
		public string Description { get; set; }

		public virtual ICollection<Product> Products { get; set; }
	}
}
