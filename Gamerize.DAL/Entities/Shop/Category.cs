﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.DAL.Entities.Shop
{
	public class Category
	{
		[Key, Column(TypeName = "tinyint")]
		public int Id { get; set; }
		public required string Name { get; set; }
		[Column(TypeName = "text")]
		public required string Description { get; set; }

		public virtual ICollection<Product> Products { get; set; }
	}
}
