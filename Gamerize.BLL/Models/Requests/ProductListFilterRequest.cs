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

    }
}
