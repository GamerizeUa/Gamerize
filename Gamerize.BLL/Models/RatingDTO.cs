namespace Gamerize.BLL.Models
{
    public class RatingDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Rate { get; set; }
        public int UserId { get; set; }
    }
}