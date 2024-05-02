using Gamerize.BLL.Models.Tokens;
using Gamerize.DAL.Entities.Admin;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Gamerize.BLL.Services
{
    public class TokenService
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenSettings _settings;

        public TokenService(
            UserManager<User> userManager)
        {
            _userManager = userManager;
            _settings = new TokenSettings { RefreshTokenValidityInDays = 5, Secret = "GamerizeGamerizeGamerizeGamerize", TokenValidityInMinutes = 10, ValidAudience = "http", 
            ValidIssuer = "http"};
        }

        public async Task<TokenResponse> GetTokenAsync(TokenRequest request)
        {


            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, request.Password))
            {

                var authClaims = GetClaims(user);

                var token = CreateToken(authClaims);
                var refreshToken = GenerateRefreshToken();

                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiredDate = DateTime.Now;
                await _userManager.UpdateAsync(user);

                return new TokenResponse { Token = token, RefreshToken = refreshToken };
            }

            throw new Exception("Authentication Failed.");

        }

        public async Task<TokenResponse> RefreshTokenAsync(RefreshTokenRequest request)
        {
            if (request is null)
            {
                throw new Exception("Invalid client request");
            }

            var principal = GetPrincipalFromExpiredToken(request.Token);
            if (principal == null)
            {
                throw new Exception("Invalid token");
            }

            var userName = principal.Identity?.Name;

            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                throw new Exception("Invalid refresh token");
            }


            if (user.RefreshToken == null)
            {
                throw new Exception("Invalid refresh token");
            }
            if (user.RefreshTokenExpiredDate.GetValueOrDefault().AddDays(7) <= DateTime.Now)
            {
                throw new Exception("Expired refresh token");
            }

            var newToken = CreateToken(principal.Claims.ToList());


            user.RefreshTokenExpiredDate = DateTime.Now;
            await _userManager.UpdateAsync(user);

            return new TokenResponse { Token = newToken, RefreshToken = request.RefreshToken };
        }

        private IEnumerable<Claim> GetClaims(User user) =>
            new List<Claim>
            {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.MobilePhone, user.PhoneNumber ?? string.Empty),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };


        private string CreateToken(IEnumerable<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Secret));

            var token = new JwtSecurityToken(
                issuer: _settings.ValidIssuer,
                audience: _settings.ValidAudience,
                expires: DateTime.Now.AddMinutes(_settings.TokenValidityInMinutes),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Secret)),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }
    }
}
