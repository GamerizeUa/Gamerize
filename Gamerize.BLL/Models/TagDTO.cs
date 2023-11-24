using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
	public class TagDTO
	{
		public int Id { get; set; }
		[Required, MaxLength(20, ErrorMessage ="The tags must be short!")]
		public string Name { get; set; }
	}
}
