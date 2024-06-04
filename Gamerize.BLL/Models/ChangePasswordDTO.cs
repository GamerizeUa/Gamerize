using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
    public class ChangePasswordDTO
    {
        [Required]
        public string Password { get; set; }
        [Required]
        public string NewPassword { get; set; }
        [Required]
        public string RepeatNewPassword { get; set; }
    }
}
