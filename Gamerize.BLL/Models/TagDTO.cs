using Gamerize.BLL.Models.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
	public class TagDTO : IEntity
	{
		private string _name;
		public int Id { get; set; }
		[Required, MaxLength(20, ErrorMessage ="The tags must be short!")]
		public string Name { get => _name.ToUpper(); set => _name = value.ToUpper(); }
	}
}
