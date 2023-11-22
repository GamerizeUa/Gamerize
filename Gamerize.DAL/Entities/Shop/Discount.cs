using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gamerize.DAL.Entities.Shop
{
	public class Discount
	{
		public int Id { get; set; }
		public int ProductId { get; set; }
		public virtual Product Product { get; set; }
		public double CurrentDiscount { get; set; }
		public DateTime? EndDiscount { get; set; }
	}
}
