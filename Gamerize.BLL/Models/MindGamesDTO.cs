using System.ComponentModel.DataAnnotations;

namespace Gamerize.BLL.Models
{
    public class MindGamesDTO
    {
        public int Id { get; set; }
        [Required, MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(50)]
        public string Description { get; set; }
    }
}
