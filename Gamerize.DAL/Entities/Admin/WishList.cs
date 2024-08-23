using Gamerize.DAL.Entities.Shop;

namespace Gamerize.DAL.Entities.Admin
{
    public class WishList
    {
        public int Id { get; set; }
        public required int UserId { get; set; }
        public virtual User User { get; set; }
        public required int ProductId { get; set; }
        public virtual Product Product { get; set; }
    }
}