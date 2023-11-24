using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
	public class LanguageDTO
	{
		public int Id { get; set; }
		[Required, MaxLength(50)]
		public string Value { get; set; }
	}
}
