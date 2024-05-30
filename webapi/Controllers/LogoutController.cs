using Gamerize.DAL.Entities.Admin;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class LogoutController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;

        public LogoutController(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            if (Request.Cookies["jwt"] != null)
            {
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.UtcNow.AddDays(-1),
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict
                };

                Response.Cookies.Append("jwt", "", cookieOptions);
            }

            return Ok(new { Message = "Logout successful" });
        }
    }
}
