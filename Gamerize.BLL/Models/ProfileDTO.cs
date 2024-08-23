using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
    public class ProfileDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string Email { get; set; }
        [RegularExpression(@"(^$|\+380\d{9})", ErrorMessage = "Номер телефону має бути у форматі +380XXXXXXXXX.")]
        public string? PhoneNumber { get; set; }
        [RegularExpression(@"^[А-Яа-яІіЇїЄєҐґ\s]+$", ErrorMessage = "Назва міста може містити лише літери українського алфавіту.")]
        public string? City { get; set; }
        public string? DeliveryAddress { get; set; }
        public string? ProfilePicture { get; set; }
        public bool? IsAdmin { get; set; }
    }
}