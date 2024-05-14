using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Gamerize.BLL.Services;
using System.Security.Claims;

namespace webapi.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class AccountController : ControllerBase
{
    private const string credentialPath = "credentials.json";
    private const string folderId = "1VLPt6EOO7CIW964y1_TiWmQEBzXUttLo";
    private readonly ILogger<AccountController> _logger;
    private readonly ProfileService _profileService;

    public AccountController(ProfileService profileService, ILogger<AccountController> logger)
    {
        _profileService = profileService;
        _logger = logger;
    }

    [HttpGet("profile")]
    [Authorize]
    public async Task<IActionResult> GetUserProfile()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            _logger.LogInformation("User not authenticated");
            return BadRequest("User not authenticated");
        }

        var userProfileData = await _profileService.GetUserProfileData(userId);
        if (userProfileData == null)
        {
            _logger.LogInformation($"No profile found for user {userId}");
            return NotFound();
        }

        return Ok(userProfileData);
    }

    [HttpPost("profile/picture")]
    [Authorize]
    public async Task<IActionResult> UploadProfilePicture(IFormFile file)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            _logger.LogInformation("User not authenticated");
            return BadRequest("User not authenticated");
        }

        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded or file is empty");
        }

        try
        {
            var uploadedUrl = await ProfileService.UploadProfilePhoto(credentialPath, folderId, file);

            await _profileService.UpdateProfilePicture(userId, uploadedUrl);

            return Ok("Profile picture uploaded successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading profile picture");
            return StatusCode(500, "Error uploading profile picture");
        }
    }

}