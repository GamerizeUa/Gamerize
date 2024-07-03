namespace Gamerize.BLL.Models.Requests
{
    public class ProductListFilterRequest
    {
        public List<int?>? Categories { get; set; }
        public List<int?>? Genres { get; set; }
        public List<int?>? Languages { get; set; }
        public List<int?>? MindGames { get; set; }
        public List<int?>? Puzzles { get; set; }
        public List<int?>? Themes { get; set; }

        public NumericFilterParameter? Ages { get; set; }
        public NumericFilterParameter? PlayersAmount { get; set; }
        public NumericFilterParameter? Price { get; set; }
        public NumericFilterParameter? GameTime { get; set; }

        public string? SortOrder { get; set; }

        public bool HasFilters()
        {
            return (Categories != null && Categories.Any(c => c.HasValue && c.Value != 0)) ||
                   (Genres != null && Genres.Any(g => g.HasValue && g.Value != 0)) ||
                   (Languages != null && Languages.Any(l => l.HasValue && l.Value != 0)) ||
                   (MindGames != null && MindGames.Any(m => m.HasValue && m.Value != 0)) ||
                   (Puzzles != null && Puzzles.Any(p => p.HasValue && p.Value != 0)) ||
                   (Themes != null && Themes.Any(t => t.HasValue && t.Value != 0)) ||
                   (Ages != null && (Ages.Min.HasValue || Ages.Max.HasValue)) ||
                   (PlayersAmount != null && (PlayersAmount.Min.HasValue || PlayersAmount.Max.HasValue)) ||
                   (Price != null && (Price.Min.HasValue || Price.Max.HasValue)) ||
                   (GameTime != null && (GameTime.Min.HasValue || GameTime.Max.HasValue));
        }
    }
}