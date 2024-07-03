using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gamerize.DAL.Entities.Admin
{
    public class PaymentMethod
    {
        [Key, Column(TypeName = "tinyint")]
        public int Id { get; set; }
        public required string PaymentMethodName { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
