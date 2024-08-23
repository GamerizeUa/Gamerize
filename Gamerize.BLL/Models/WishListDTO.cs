namespace Gamerize.BLL.Models
{
    public class WishListDTO
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public ProductFullDTO Product { get; set; }
    }
}