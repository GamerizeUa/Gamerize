using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Admin;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Gamerize.BLL.Services
{
    public class ProfileService
    {
        private readonly UserManager<DAL.Entities.Admin.User> _userManager;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<DAL.Entities.Admin.User> _repository;

        public ProfileService(IUnitOfWork unitOfWork, UserManager<DAL.Entities.Admin.User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _repository = _unitOfWork.GetRepository<DAL.Entities.Admin.User>();
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
                PhoneNumber = user.PhoneNumber,
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

            var currentEmail = user.Email;

            if (string.IsNullOrWhiteSpace(profileUpdate.PhoneNumber))
            {
                profileUpdate.PhoneNumber = null;
            }

            _mapper.Map(profileUpdate, user);
            user.Email = currentEmail;

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

        public static void DeleteFileFromGoogleDrive(string credentialPath, string fileId)
        {
            GoogleCredential credential;

            using (var stream = new FileStream(credentialPath, FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream).CreateScoped(new[]
                { DriveService.ScopeConstants.Drive });
            }

            var service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "DeletePhoto"
            });

            service.Files.Delete(fileId).Execute();
        }

        public async Task<IdentityResult> ChangePassword(string userId, ChangePasswordDTO changePasswordDto)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("Користувача не знайдено!");
            }

            var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.Password, changePasswordDto.NewPassword);
            return result;
        }

        public async Task<bool> ValidateCurrentPassword(string userId, string currentPassword)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            return await _userManager.CheckPasswordAsync(user, currentPassword);
        }

    }
}