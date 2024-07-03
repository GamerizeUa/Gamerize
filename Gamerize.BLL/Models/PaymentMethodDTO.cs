using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
    public class PaymentMethodDTO
    {
        [Key, Column(TypeName = "tinyint")]
        public int Id { get; set; }
        [Required]
        public string PaymentMethodName { get; set; }
    }
}
