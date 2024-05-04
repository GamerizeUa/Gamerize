using Gamerize.BLL.Models;
using Gamerize.BLL.Models.Tokens;
using Gamerize.BLL.Services;
using Gamerize.DAL.Entities.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly TokenService _tokenService;

        public LoginController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = new TokenService(userManager);
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

            var tokenRequest = new TokenRequest { Email = model.Email, Password = model.Password };
            var tokenResponse = await _tokenService.GetTokenAsync(tokenRequest);

            if (tokenResponse == null)
            {
                return BadRequest(new { Message = "Failed to generate token" });
            }

            return Ok(new { Token = tokenResponse.Token });
        }

        //[HttpPost("token")]
        //public async Task<IActionResult> Login([FromBody] TokenRequest request)
        //{
        //    return Ok(await _tokenService.GetTokenAsync(request));
        //}

        //[HttpPost("refresh-token")]
        //public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        //{
        //    return Ok(await _tokenService.RefreshTokenAsync(request));
        //}
    }
}