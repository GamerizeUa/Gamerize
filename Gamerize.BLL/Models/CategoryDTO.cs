using Gamerize.BLL.Models.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
	public class CategoryDTO : IEntity
	{
		public int Id { get; set; }
		[Required, MaxLength(50)]
		public string Name { get; set; }
		[Required]
		public string Description { get; set; }
	}
}
