using Gamerize.BLL.Models;
using Gamerize.DAL.Entities.Admin;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Http;
using Google.Apis.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Gamerize.BLL.Services
{
    public class ProfileService
    {
        private readonly UserManager<User> _userManager;

        public ProfileService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task UploadProfilePictureAsync(IFormFile file, User user)
        {
            try
            {
                var driveService = new DriveService(new BaseClientService.Initializer
                {
                    HttpClientInitializer = GetCredential(),
                    ApplicationName = "Gamerize",
                });

                var fileMetadata = new Google.Apis.Drive.v3.Data.File
                {
                    Name = Path.GetFileName(file.FileName),
                    Parents = new List<string> { "1VLPt6EOO7CIW964y1_TiWmQEBzXUttLo" }
                };

                FilesResource.CreateMediaUpload request;

                using (var stream = file.OpenReadStream())
                {
                    request = driveService.Files.Create(fileMetadata, stream, "application/octet-stream");
                    request.Fields = "id";
                    await request.UploadAsync();
                }

                var fileUploaded = request.ResponseBody;

                user.ProfilePicture = $"https://drive.google.com/uc?export=view&id={fileUploaded.Id}";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Помилка при завантаженні зображення: {ex.Message}");

                throw;
            }
        }

        private IConfigurableHttpClientInitializer GetCredential()
        {
            string credPath = "client_secret_209654802530-57s5rta89ug2djrfbmn30cq9ggohhib0.apps.googleusercontent.com.json";

            return GoogleCredential.FromFile(credPath)
                .CreateScoped(DriveService.Scope.Drive);
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
                DeliveryAddress = user.DeliveryAddress
            };

            return userProfileData;
        }
    }
}
