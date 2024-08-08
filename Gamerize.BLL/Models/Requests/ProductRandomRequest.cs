namespace Gamerize.BLL.Models.Requests
{
    public class ProductRandomRequest
    {
        public List<int?>? Categories { get; set; }

        public List<NumericFilterParameter>? Ages { get; set; }
        public List<NumericFilterParameter>? PlayersAmount { get; set; }

        public bool HasFilters()
        {
            return (Categories != null && Categories.Any(c => c.HasValue && c.Value != 0)) ||
                   (Ages != null && Ages.Any(a => (a.Min.HasValue && a.Min.Value != 0) || (a.Max.HasValue && a.Max.Value != 0))) ||
                   (PlayersAmount != null && PlayersAmount.Any(pa => (pa.Min.HasValue && pa.Min.Value != 0) || (pa.Max.HasValue && pa.Max.Value != 0)));
        }
    }
}
