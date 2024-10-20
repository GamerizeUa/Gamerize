﻿using Gamerize.BLL.Models.Interfaces;

namespace Gamerize.BLL.Models
{
	public class ProductShortDTO : IEntity
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public decimal Price { get; set; }
		public int MaxPlayers { get; set; }
		public int MinAge { get; set; }
		public int MinGameTimeMinutes { get; set; }
		public int MaxGameTimeMinutes { get; set; }
		public double GameRateAvg { get; set; }
		public string ImagePath { get; set; }
	}
}
