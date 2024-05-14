using Gamerize.BLL.Models;
using Gamerize.BLL.Models.Tokens;
using Gamerize.BLL.Services;
using Gamerize.DAL.Entities.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

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

        public LoginController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
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

            return Ok(new { Token = token });
        }

    }
}