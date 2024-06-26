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
                SameSite = SameSiteMode.None,
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
                return BadRequest(new { Message = "Помилковий стан моделі" });
            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest(new { Message = "Користувача не знайдено" });
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
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(1)
            };

            Response.Cookies.Append("resetToken", token, resetTokenCookieOptions);

            return Ok(new { Message = "Посилання для зміни пароля надіслано на вашу електронну адресу.", model.Email });
        }

        [HttpPost("reset-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Недійсний стан моделі" });
            }

            if (model.Password != model.RepeatPassword)
            {
                return BadRequest(new { Message = "Паролі не збігаються" });
            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest(new { Message = "Користувач не знайдений" });
            }

            var token = Request.Cookies["resetToken"];
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { Message = "Недійсний або прострочений маркер скидання" });
            }

            var result = await _userManager.ResetPasswordAsync(user, token, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new { Message = "Помилка скидання пароля", Errors = result.Errors });
            }

            return Ok(new { Message = "Пароль успішно скинуто." });
        }
    }
}