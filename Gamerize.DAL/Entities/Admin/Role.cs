using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Gamerize.DAL.Entities.Admin
{
	public class Role : IdentityRole<int>
	{
		public const string User  = "User";
		public const string Admin = "Admin";
		public const string Moderator = "Moderator";
	}
}
