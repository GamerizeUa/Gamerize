using Gamerize.BLL.Models;
using Gamerize.DAL.Entities.Admin;

namespace webapi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Gamerize.BLL.Models.Tokens;
using Gamerize.BLL.Services;
using System.Security.Claims;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly TokenService _tokenService;
    private readonly ProfileService _profileService;

    public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, ProfileService profileService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = new TokenService(userManager);
        _profileService = profileService;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new User {UserName = model.Email, Email = model.Email };

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
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, model.RememberMe);

                if (result.Succeeded)
                {

                    return Ok(new { Message = "Login successful" });
                }
                else
                {
                   
                    return BadRequest(new { Message = "Invalid login attempt" });
                }
            }
            else
            {
                
                return BadRequest(new { Message = "Invalid login attempt" });
            }
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

    //[HttpPost("upload-profile-picture")]
    //public async Task<IActionResult> UploadProfilePicture([FromForm] IFormFile file)
    //{
    //    if (file == null || file.Length == 0)
    //        return BadRequest("Invalid file");

    //    var user = await _userManager.GetUserAsync(User);

    //    if (user == null)
    //        return Unauthorized();

    //    await _profileService.UploadProfilePictureAsync(file, user);

    //    return Ok(new { Message = "Profile picture uploaded successfully" });
    //}

    [HttpPost("upload-profile-picture")]
    public async Task<IActionResult> UploadProfilePicture([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("Invalid file");

        var user = await _userManager.GetUserAsync(User);

        if (user == null)
            return Unauthorized();

        try
        {
            await _profileService.UploadProfilePictureAsync(file, user);

            return Ok(new { Message = "Profile picture uploaded successfully" });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Помилка при завантаженні зображення: {ex.Message}");

            return StatusCode(500, "Помилка при завантаженні зображення. Зверніться до адміністратора.");
        }
    }


    [HttpGet("profile")]
    [Authorize]
    public async Task<IActionResult> GetUserProfile()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }

        var userProfileData = await _profileService.GetUserProfileData(userId);
        if (userProfileData == null)
        {
            return NotFound();
        }

        return Ok(userProfileData);
    }
}