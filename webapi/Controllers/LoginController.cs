using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
using Gamerize.DAL.Entities.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text.Encodings.Web;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;

        public LoginController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _emailSender = emailSender;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid model state" });
            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest(new { Message = "Invalid login attempt" });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, model.RememberMe);
            if (!result.Succeeded)
            {
                return BadRequest(new { Message = "Invalid login attempt" });
            }

            var authHelper = new AuthHelper(_configuration);
            var token = authHelper.GenerateJWTToken(user);

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { Message = "Failed to generate token" });
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(1)
            };

            Response.Cookies.Append("jwt", token, cookieOptions);

            return Ok(new { Message = "Login successful" });
        }

        [HttpGet("check")]
        public IActionResult CheckAuth()
        {
            if (User.Identity.IsAuthenticated)
            {
                return Ok(new { Message = "User is authenticated" });
            }
            else
            {
                return Unauthorized(new { Message = "User is not authenticated" });
            }
        }

        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid model state" });
            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest(new { Message = "User not found" });
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var frontendUrl = "https://gamerize.ltd.ua/reset-password";
            var callbackUrl = $"{frontendUrl}?email={user.Email}&token={token}";

            await _emailSender.SendEmailAsync(model.Email, "Скидання пароля",
                $"Шановний клієнте, для скидання паролю перейдіть за посиланням: \n" +
                $"<a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>натисніть тут</a>.");

            var resetTokenCookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(1)
            };

            Response.Cookies.Append("resetToken", token, resetTokenCookieOptions);

            return Ok(new { Message = "Password reset link has been sent to your email.", model.Email });
        }

        [HttpPost("reset-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid model state" });
            }

            if (model.Password != model.RepeatPassword)
            {
                return BadRequest(new { Message = "Passwords do not match" });
            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest(new { Message = "User not found" });
            }

            var token = Request.Cookies["resetToken"];
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { Message = "Invalid or expired reset token" });
            }

            var result = await _userManager.ResetPasswordAsync(user, token, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new { Message = "Error resetting password", Errors = result.Errors });
            }

            return Ok(new { Message = "Password has been reset successfully." });
        }
    }
}