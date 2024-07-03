using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
    public class StatusDTO
    {
        public int Id { get; set; }
        [Required]
        public string Status { get; set; }

        //public ICollection<OrderDTO>? Orders { get; set; }
    }
}
