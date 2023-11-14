using System.ComponentModel.DataAnnotations;

namespace Gamerize.DAL.Entities.Shop
{
    public class Feedback
    {
        public int Id { get; set; }
        [MaxLength(30)]
        public string CustomerName { get; set; }
        public string Text { get; set; }
		public DateTime CreatedDate { get; set; }
        public int Rate { get; set; }

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
    }
}
