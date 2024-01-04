using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.DAL.Entities.Shop
{
	public class Image
	{
		public int Id { get; set; }
		[Column(TypeName = "tinyint")]
		public int Number { get; set; }
		public string Path { get; set; }
		public int ProductId { get; set; }
		public virtual Product Product { get; set; }
	}
}
