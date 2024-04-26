using Microsoft.AspNetCore.Identity;
using System;

namespace Gamerize.DAL.Entities.Admin
{
	public class User : IdentityUser<int>
	{
	
        public string? RefreshToken { get; set; }
		public DateTime? RefreshTokenExpiredDate { get; set; }

	}
}
