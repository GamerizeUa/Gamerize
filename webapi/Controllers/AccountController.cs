using Gamerize.BLL.Models;
using Gamerize.DAL.Entities.Admin;

namespace webapi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Gamerize.BLL.Models.Tokens;
using Gamerize.BLL.Services;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = new TokenService(userManager);
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new User {FirstName = model.FirstName, LastName = model.LastName, UserName = model.Email, Email = model.Email };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok(new { Message = "Registration successful" });
            }

            return BadRequest(new { Errors = result.Errors });
        }

        return BadRequest(new { Message = "Invalid model state" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginViewModel model)
    {
        if (ModelState.IsValid)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return Ok(new { Message = "Login successful" });
            }

            return BadRequest(new { Message = "Invalid login attempt" });
        }

        return BadRequest(new { Message = "Invalid model state" });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok(new { Message = "Logout successful" });
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        return Ok(await _tokenService.RefreshTokenAsync(request));
    }

    [HttpPost("token")]
    public async Task<IActionResult> Login([FromBody] TokenRequest request)
    {
        return Ok(await _tokenService.GetTokenAsync(request));
    }
}