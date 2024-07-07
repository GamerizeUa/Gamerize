using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Gamerize.DAL.Entities.Admin;

namespace Gamerize.DAL.Entities.Shop
{
    public class Rating
    {
        [Key, Column(TypeName = "tinyint")]
        public int Id { get; set; }
        public required int Rate { get; set; }

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}