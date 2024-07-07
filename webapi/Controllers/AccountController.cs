using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Gamerize.BLL.Services;
using System.Security.Claims;
using Gamerize.BLL.Models;
using Microsoft.AspNetCore.Identity;
using Gamerize.DAL.Entities.Admin;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using Microsoft.AspNetCore.Identity.UI.Services;
using System.Text.Encodings.Web;

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
    private readonly UserManager<User> _userManager;
    private readonly IEmailSender _emailSender;

    public AccountController(UserManager<User> userManager, ProfileService profileService, ILogger<AccountController> logger,
        IEmailSender emailSender)
    {
        _profileService = profileService;
        _logger = logger;
        _userManager = userManager;
        _emailSender = emailSender;
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

    [HttpPatch("update-profile")]
    [Authorize]
    public async Task<IActionResult> UpdateUserProfile([FromBody] ProfileDTO profileUpdate)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            _logger.LogInformation("User not authenticated");
            return BadRequest("User not authenticated");
        }

        try
        {
            var updatedProfile = await _profileService.UpdateUserProfile(userId, profileUpdate);
            return Ok(updatedProfile);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to update user profile");
            return StatusCode(500, "Failed to update user profile");
        }
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
            var uploadedUrl = await ProfileService.UploadProfilePhoto(credentialPath, folderId, file, userId);

            await _profileService.UpdateProfilePicture(userId, uploadedUrl, credentialPath);

            return Ok("Profile picture uploaded successfully");
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading profile picture");
            return StatusCode(500, "Error uploading profile picture");
        }
    }

    [HttpDelete("delete-photo")]
    [Authorize]
    public async Task<IActionResult> DeletePhotoAsync()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
        }

        if (!string.IsNullOrEmpty(user.ProfilePicture))
        {
            var fileId = user.ProfilePicture.Split("id=")[1];
            ProfileService.DeleteFileFromGoogleDrive(credentialPath, fileId);
        }

        user.ProfilePicture = null;

        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            return BadRequest("Unexpected error when trying to delete photo.");
        }

        return Ok("Your photo has been deleted");
    }

    [HttpPost("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO changePasswordDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            _logger.LogInformation("Користувач не автентифікований");
            return BadRequest("Користувач не автентифікований");
        }

        if (changePasswordDto.NewPassword != changePasswordDto.RepeatNewPassword)
        {
            return BadRequest("Нові паролі не збігаються");
        }

        if (changePasswordDto.Password == changePasswordDto.NewPassword)
        {
            return BadRequest("Новий пароль не може збігатися зі старим");
        }

        try
        {
            var isCurrentPasswordValid = await _profileService.ValidateCurrentPassword(userId, changePasswordDto.Password);
            if (!isCurrentPasswordValid)
            {
                return BadRequest("Неправильний поточний пароль");
            }

            var result = await _profileService.ChangePassword(userId, changePasswordDto);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok("Пароль успішно змінено");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Не вдалося змінити пароль");
            return StatusCode(500, "Не вдалося змінити пароль");
        }
    }
}