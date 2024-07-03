using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gamerize.DAL.Entities.Admin
{
    public class DeliveryMethod
    {
        [Key, Column(TypeName = "tinyint")]
        public int Id { get; set; }
        public required string DeliveryMethodName { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}