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

        public List<NumericFilterParameter>? Ages { get; set; }
        public List<NumericFilterParameter>? PlayersAmount { get; set; }
        public List<NumericFilterParameter>? Price { get; set; }
        public List<NumericFilterParameter>? GameTime { get; set; }

        public string? SortOrder { get; set; }
        public string? SearchTerm { get; set; }

        public bool HasFilters()
        {
            return (Categories != null && Categories.Any(c => c.HasValue && c.Value != 0)) ||
                   (Genres != null && Genres.Any(g => g.HasValue && g.Value != 0)) ||
                   (Languages != null && Languages.Any(l => l.HasValue && l.Value != 0)) ||
                   (MindGames != null && MindGames.Any(m => m.HasValue && m.Value != 0)) ||
                   (Puzzles != null && Puzzles.Any(p => p.HasValue && p.Value != 0)) ||
                   (Themes != null && Themes.Any(t => t.HasValue && t.Value != 0)) ||
                   (Ages != null && Ages.Any(a => (a.Min.HasValue && a.Min.Value != 0) || (a.Max.HasValue && a.Max.Value != 0))) ||
                   (PlayersAmount != null && PlayersAmount.Any(pa => (pa.Min.HasValue && pa.Min.Value != 0) || (pa.Max.HasValue && pa.Max.Value != 0))) ||
                   (Price != null && Price.Any(p => (p.Min.HasValue && p.Min.Value != 0) || (p.Max.HasValue && p.Max.Value != 0))) ||
                   (GameTime != null && GameTime.Any(gt => (gt.Min.HasValue && gt.Min.Value != 0) || (gt.Max.HasValue && gt.Max.Value != 0))) ||
                   !string.IsNullOrEmpty(SearchTerm);
        }
    }
}