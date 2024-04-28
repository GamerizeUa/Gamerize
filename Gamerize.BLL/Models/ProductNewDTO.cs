using Gamerize.BLL.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamerize.BLL.Models
{
    public class ProductNewDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required, Column(TypeName = "decimal(6,2)")]
        public decimal Price { get; set; }
        [Required, Range(1, 30)]
        public int MinPlayers { get; set; }
        [Range(2, 30)]
        public int? MaxPlayers { get; set; }
        [Required, Range(0, 21)]
        public int MinAge { get; set; }
        [Required, Range(5, 240)]
        public int MinGameTimeMinutes { get; set; }
        [Required, Range(5, 240)]
        public int MaxGameTimeMinutes { get; set; }
        [Required]
        public int LanguageId { get; set; }
        public int? CategoryId { get; set; }
        public int? GenreId { get; set; }
        public int? ThemeId { get; set; }

        public int? PuzzleId { get; set; }
        public int? MindGamesId { get; set; }

        public ICollection<IFormFile> NewImages { get; set; } = new List<IFormFile>();
        public int[] NewTags { get; set; } = Array.Empty<int>();
    }
}
