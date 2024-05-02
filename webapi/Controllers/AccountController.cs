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
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class AccountController : ControllerBase
{
    #region FAILDE PHOTO
    private readonly string _pathToSecret = @"client_secret_214402206807-j2ub7qopgmab6h5o7t9bc4fago2n39a0.apps.googleusercontent.com.json";
    private readonly string _folderId = "1VLPt6EOO7CIW964y1_TiWmQEBzXUttLo";
    #endregion

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
    [AllowAnonymous]
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
                    var token = await _tokenService.GetTokenAsync(new TokenRequest { Email = model.Email, Password = model.Password });

                    return Ok(new { Message = "Login successful", UserId = user.Id, Token = token });
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
    [Authorize]
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
    #region FAILED PHOTO
    //[HttpPost("upload-profile-picture")]
    //public async Task<IActionResult> UploadProfilePicture([FromForm] IFormFile file)
    //{
    //    if (file == null || file.Length == 0)
    //        return BadRequest("Invalid file");

    //    var user = await _userManager.GetUserAsync(User);

    //    if (user == null)
    //        return Unauthorized();

    //    try
    //    {
    //        await _profileService.UploadProfilePictureAsync(file, user);

    //        return Ok(new { Message = "Profile picture uploaded successfully" });
    //    }
    //    catch (Exception ex)
    //    {
    //        Console.WriteLine($"Помилка при завантаженні зображення: {ex.Message}");

    //        return StatusCode(500, "Помилка при завантаженні зображення. Зверніться до адміністратора.");
    //    }
    //}

    [HttpPost("upload-profile-picture")]
    [Authorize]
    //[AllowAnonymous]
    public async Task<IActionResult> UploadProfilePicture(IFormFile file, [FromServices] UserManager<User> userManager)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded or file is empty");
        }

        var user = await userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var credential = GoogleCredential.FromFile(_pathToSecret)
            .CreateScoped(DriveService.Scope.DriveFile);

        var service = new DriveService(new BaseClientService.Initializer
        {
            HttpClientInitializer = credential
        });

        var fileMetadata = new Google.Apis.Drive.v3.Data.File
        {
            Name = Path.GetFileName(file.FileName),
            Parents = new List<string>
            {
                _folderId
            }
        };

        FilesResource.CreateMediaUpload request;

        using (var stream = new MemoryStream())
        {
            await file.CopyToAsync(stream);
            request = service.Files.Create(
                fileMetadata, stream, GetMimeType(file.FileName));
            request.Fields = "id";
            await request.UploadAsync();
        }

        var fileOnDrive = request.ResponseBody;
        if (fileOnDrive == null)
        {
            return BadRequest("Failed to upload file to Google Drive");
        }

        user.ProfilePicture = $"https://drive.google.com/uc?export=view&id={fileOnDrive.Id}";

        await userManager.UpdateAsync(user);

        return Ok(new { user.ProfilePicture });
    }

    [Authorize]
    private string GetMimeType(string fileName)
    {
        var fileInfo = new FileInfo(fileName);
        return fileInfo.Extension.ToLower() switch
        {
            ".jpeg" => "image/jpeg",
            ".jpg" => "image/jpeg",
            ".png" => "image/png",
            _ => "application/octet-stream",
        };
    }
#endregion 
    [HttpGet("profile")]
    [Authorize]
    public async Task<IActionResult> GetUserProfile([FromQuery] string userId)
    {
        var userProfileData = await _profileService.GetUserProfileData(userId);
        if (userProfileData == null)
        {
            return NotFound();
        }

        return Ok(userProfileData);
    }
}