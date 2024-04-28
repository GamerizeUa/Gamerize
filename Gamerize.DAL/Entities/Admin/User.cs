using Microsoft.AspNetCore.Identity;

namespace Gamerize.DAL.Entities.Admin
{
	public class User : IdentityUser<int>
	{
		public string? Name { get; set; }
        public string? RefreshToken { get; set; }
		public DateTime? RefreshTokenExpiredDate { get; set; }
		public string? ProfilePicture { get; set; }
        public string? City { get; set; }
        public string? DeliveryAddress { get; set; }
    }
}