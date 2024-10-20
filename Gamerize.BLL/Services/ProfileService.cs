﻿using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.BLL.Specifications;
using Gamerize.Common.Config;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Repositories.Interfaces;
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
                ProfilePicture = user.ProfilePicture,
                IsAdmin = user.IsAdmin,
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

        public static async Task<string> UploadProfilePhoto(string credentialPath, string folderId, IFormFile photo, string userId)
        {
            if (!photo.ContentType.StartsWith("image/"))
            {
                throw new ArgumentException("File is not a valid image");
            }

            if (photo.Length > 10 * 1024 * 1024)
            {
                throw new ArgumentException("File size exceeds 10MB limit");
            }

            var fileExtension = Path.GetExtension(photo.FileName);
            var newFileName = $"{userId}{fileExtension}";
            var filePath = Path.Combine(Path.GetTempPath(), newFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await photo.CopyToAsync(stream);
            }

            var uploadedUrl = UploadFileToGoogleDrive(credentialPath, folderId, filePath);

            System.IO.File.Delete(filePath);

            return uploadedUrl;
        }

        public async Task UpdateProfilePicture(string userId, string pictureUrl, string credentialPath)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                if (!string.IsNullOrEmpty(user.ProfilePicture))
                {
                    var oldFileId = user.ProfilePicture.Split("id=")[1];
                    DeleteFileFromGoogleDrive(credentialPath, oldFileId);
                }

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

        public async Task DeleteAsync(int id)
        {
            try
            {
                var currentEntity = await _repository.GetByIdAsync(id) ??
                    throw new InvalidIdException(ExceptionMessage(id));
                await _repository.DeleteAsync(currentEntity);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<IsAdminUserDTO> GetIsAdminAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var isAdmin = new IsAdminUserDTO
            {
                IsAdmin = user.IsAdmin,
            };

            return isAdmin;
        }
        #region Supporting methods
        private string ExceptionMessage(object? value = null) =>
            value switch
            {
                int id when value is int => $"Продукта з id: {id} ще/вже не існує!",
                string name when value is string => $"...",
                _ => "Something has gone wrong"
            };
        #endregion
    }
}