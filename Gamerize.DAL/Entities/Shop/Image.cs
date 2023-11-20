using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gamerize.DAL.Entities.Shop
{
	public class Image
	{
		public int Id { get; set; }
		public string Path { get; set; }
		public int ProductId { get; set; }
		public virtual Product Product { get; set; }
	}
}
