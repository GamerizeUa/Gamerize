using Gamerize.BLL.Models.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
	public class ThemeDTO : IEntity
	{
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Description { get; set; }
	}
}
