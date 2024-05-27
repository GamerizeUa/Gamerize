using Gamerize.BLL.Models;
using Gamerize.DAL.Entities.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IEmailSender _emailSender;

        public RegisterController(UserManager<User> userManager, SignInManager<User> signInManager, IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new User
                {
                    UserName = model.Email,
                    Email = model.Email,
                    Name = model.Name
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

                    var frontendUrl = "https://gamerize.ltd.ua/confirm-email";
                    var callbackUrl = $"{frontendUrl}?userId={user.Id}&code={code}";

                    await _emailSender.SendEmailAsync(model.Email, "Підтвердження електронної пошти",
                        $"Вітаємо, шановний клієнте! Ви щойно зареєструвались на сайті Gamerise! " +
                        $"\r\nПідтвердіть вашу електронну пошту, перейшовши за посиланням: " +
                        $"<a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>натисніть тут</a>.");

                    return Ok(new { userId = user.Id, code });
                }

                return BadRequest(new { Errors = result.Errors });
            }

            return BadRequest(new { Message = "Invalid model state" });
        }

        [HttpGet("confirm-email")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return BadRequest(new { Message = "User ID and code are required" });
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { Message = $"Unable to load user with ID '{userId}'." });
            }

            var decodedCode = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var result = await _userManager.ConfirmEmailAsync(user, decodedCode);

            if (result.Succeeded)
            {
                return Ok(new { Message = "Email confirmed successfully" });
            }

            return BadRequest(new { Errors = result.Errors });
        }
    }
}
