using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.DAL.Entities.Admin
{
	public class OrderStatus
	{
		[Key, Column(TypeName = "tinyint")]
		public int Id { get; set; }
		public string Status { get; set; }

		public virtual ICollection<Order> Orders { get; set; }
	}
}
