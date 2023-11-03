using Microsoft.AspNetCore.Identity;

namespace Gamerize.DAL.Entities.Admin
{
	public class User : IdentityUser
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
	}
}
