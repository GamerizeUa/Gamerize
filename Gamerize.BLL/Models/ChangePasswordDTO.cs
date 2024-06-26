using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
    public class ChangePasswordDTO
    {
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string RepeatNewPassword { get; set; }
    }
}