using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
    public class UnregisteredUserDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string DeliveryAddress { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
