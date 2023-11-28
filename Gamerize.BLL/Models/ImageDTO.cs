using Gamerize.BLL.Models.Interfaces;

namespace Gamerize.BLL.Models
{
	public class ImageDTO : IEntity
	{
		public int Id { get; set; }
		public string Path { get; set; }
		public int ProductId { get; set; }
	}
}
