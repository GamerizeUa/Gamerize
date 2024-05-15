using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.DAL.Entities.Admin;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Gamerize.BLL.Services
{
    public class ProfileService
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public ProfileService(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<ProfileDTO> GetUserProfileData(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var userProfileData = new ProfileDTO
            {
                Id = user.Id,
                Name = user.Name,
                Phone = user.PhoneNumber,
                Email = user.Email,
                City = user.City,
                DeliveryAddress = user.DeliveryAddress,
                ProfilePicture = user.ProfilePicture
            };

            return userProfileData;
        }

        public async Task<ProfileDTO> UpdateUserProfile(string userId, ProfileDTO profileUpdate)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            _mapper.Map(profileUpdate, user);

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                throw new Exception("Failed to update user profile");
            }

            return _mapper.Map<ProfileDTO>(user);
        }

        public static string UploadFileToGoogleDrive(string credentialPath, string folderId, string fileToUpload)
        {
            GoogleCredential credential;

            using (var stream = new FileStream(credentialPath, FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream).CreateScoped(new[]
                { DriveService.ScopeConstants.DriveFile });
            }

            var service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "UploadPhoto"
            });

            var fileMetaData = new Google.Apis.Drive.v3.Data.File()
            {
                Name = Path.GetFileName(fileToUpload),
                Parents = new List<string> { folderId }
            };

            FilesResource.CreateMediaUpload request;

            using (var stream = new FileStream(fileToUpload, FileMode.Open))
            {
                request = service.Files.Create(fileMetaData, stream, "");
                request.Fields = "id";
                request.Upload();
            }

            var uploadPhoto = request.ResponseBody;

            return $"https://drive.google.com/thumbnail?id={uploadPhoto.Id}";
        }

        public static async Task<string> UploadProfilePhoto(string credentialPath, string folderId, IFormFile photo)
        {
            var filePath = Path.GetTempFileName();
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await photo.CopyToAsync(stream);
            }

            var uploadedUrl = UploadFileToGoogleDrive(credentialPath, folderId, filePath);

            System.IO.File.Delete(filePath);

            return uploadedUrl;
        }

        public async Task UpdateProfilePicture(string userId, string pictureUrl)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                user.ProfilePicture = pictureUrl;
                await _userManager.UpdateAsync(user);
            }
            else
            {
                throw new ArgumentException("User not found", nameof(userId));
            }
        }
    }
}