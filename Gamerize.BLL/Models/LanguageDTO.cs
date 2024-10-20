﻿using Gamerize.BLL.Models.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
	public class LanguageDTO : IEntity
	{
		public int Id { get; set; }
		[Required, MaxLength(50)]
		public string Name { get; set; }
	}
}
