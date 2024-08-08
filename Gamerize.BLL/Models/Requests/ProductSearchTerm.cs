namespace Gamerize.BLL.Models.Requests
{
    public class ProductSearchTerm
    {
        public string? SearchTerm { get; set; }

        public bool HasFilters()
        {
            return !string.IsNullOrEmpty(SearchTerm);
        }
    }
}