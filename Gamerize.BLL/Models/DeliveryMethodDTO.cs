using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
    public class DeliveryMethodDTO
    {
        [Key, Column(TypeName = "tinyint")]
        public int Id { get; set; }
        [Required]
        public string DeliveryMethodName { get; set; }
    }
}
