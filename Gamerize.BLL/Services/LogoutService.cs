using Azure.Core;
using Gamerize.DAL.Entities.Admin;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Gamerize.BLL.Services
{
    public class LogoutService
    {
        private readonly SignInManager<User> _signInManager;

        public LogoutService(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        public async Task LogoutAsync(HttpRequest request, HttpResponse response)
        {
            await _signInManager.SignOutAsync();

            if (request.Cookies["jwt"] != null)
            {
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.UtcNow.AddDays(-1),
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None
                };

                response.Cookies.Append("jwt", "", cookieOptions);
            }
        }
    }
}
