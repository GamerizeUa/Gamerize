using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
	public class GenreDTO
	{
		public int Id { get; set; }
		[Required, MaxLength(50)]
		public string Name { get; set; }
	}
}
