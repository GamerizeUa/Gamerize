using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.DAL.Entities.Shop
{
	public class Image
	{
		public int Id { get; set; }
		[Column(TypeName = "tinyint")]
		public required int Number { get; set; }
		public required string Path { get; set; }
		public required int ProductId { get; set; }
		public virtual Product Product { get; set; }
	}
}
