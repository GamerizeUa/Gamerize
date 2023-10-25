using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gamerize.DAL.Entities.Shop
{
	public class DiscountCoupon
	{
		public int Id { get; set; }
		public string Code { get; set; }
		public DateTime ActiveFrom { get; set; }
		public DateTime ActiveTo { get; set; }
	}
}
