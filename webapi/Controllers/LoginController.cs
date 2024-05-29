using Gamerize.BLL.Models;
using Gamerize.BLL.Models.Tokens;
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
        [Authorize]
        public IActionResult CheckAuth()
        {
            return Ok(new { Message = "User is authenticated" });
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
                $"Вітаємо, шановний клієнте! Ви щойно запросили дію для скидання свого паролю на сайті Gamerize! " +
                $"\r\nПідтвердіть вашу дію, перейшовши за посиланням: " +
                $"<a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>натисніть тут</a>.");

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

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest(new { Message = "User not found" });
            }

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new { Message = "Error resetting password", Errors = result.Errors });
            }

            return Ok(new { Message = "Password has been reset successfully." });
        }
    }
}