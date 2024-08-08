using Gamerize.BLL.Models.Requests;
using Gamerize.BLL.Models;
using System.Linq;

namespace Gamerize.BLL.Builder
{
    public class FilterBuilder
    {
        internal IEnumerable<ProductFullDTO> ApplyFilters(IEnumerable<ProductFullDTO> products, ProductListFilterRequest filterRequest)
        {
            if (!string.IsNullOrEmpty(filterRequest.SearchTerm))
            {
                var searchTerm = filterRequest.SearchTerm.ToLower();
                products = products.Where(p =>
                    p.Name.ToLower().Contains(searchTerm) ||
                    p.Tags.Any(t => t.Name.ToLower().Contains(searchTerm))
                ).ToList();
            }

            if (filterRequest.Languages != null && filterRequest.Languages.Any(l => l.HasValue && l.Value != 0))
            {
                products = products.Where(p => p.Language != null && filterRequest.Languages.Contains(p.Language.Id)).ToList();
            }

            if (filterRequest.Categories != null && filterRequest.Categories.Any(c => c.HasValue && c.Value != 0))
            {
                products = products.Where(p => p.Category != null && filterRequest.Categories.Contains(p.Category.Id));
            }

            if (filterRequest.Genres != null && filterRequest.Genres.Any(g => g.HasValue && g.Value != 0))
            {
                products = products.Where(p => p.Genre != null && filterRequest.Genres.Contains(p.Genre.Id));
            }

            if (filterRequest.MindGames != null && filterRequest.MindGames.Any(m => m.HasValue && m.Value != 0))
            {
                products = products.Where(p => p.MindGames != null && filterRequest.MindGames.Contains(p.MindGames.Id));
            }

            if (filterRequest.Puzzles != null && filterRequest.Puzzles.Any(pz => pz.HasValue && pz.Value != 0))
            {
                products = products.Where(p => p.Puzzle != null && filterRequest.Puzzles.Contains(p.Puzzle.Id));
            }

            if (filterRequest.Themes != null && filterRequest.Themes.Any(t => t.HasValue && t.Value != 0))
            {
                products = products.Where(p => p.Theme != null && filterRequest.Themes.Contains(p.Theme.Id));
            }

            if (filterRequest.Ages != null && filterRequest.Ages.Any())
            {
                var ageRanges = filterRequest.Ages.Where(a => (a.Min.HasValue && a.Min.Value != 0) || (a.Max.HasValue && a.Max.Value != 0)).ToList();

                if (ageRanges.Any())
                {
                    var ageFilteredProducts = new List<ProductFullDTO>();

                    foreach (var ageFilter in ageRanges)
                    {
                        var tempProducts = products;

                        if (ageFilter.Min.HasValue && ageFilter.Min.Value != 0)
                        {
                            tempProducts = tempProducts.Where(p => p.MinAge >= ageFilter.Min.Value);
                        }

                        if (ageFilter.Max.HasValue && ageFilter.Max.Value != 0)
                        {
                            tempProducts = tempProducts.Where(p => p.MinAge <= ageFilter.Max.Value);
                        }

                        ageFilteredProducts.AddRange(tempProducts);
                    }

                    products = ageFilteredProducts.Distinct().ToList();
                }
            }

            if (filterRequest.PlayersAmount != null && filterRequest.PlayersAmount.Any())
            {
                var playerRanges = filterRequest.PlayersAmount.Where(p => (p.Min.HasValue && p.Min.Value != 0) || (p.Max.HasValue && p.Max.Value != 0)).ToList();

                if (playerRanges.Any())
                {
                    var playerFilteredProducts = new List<ProductFullDTO>();

                    foreach (var playersFilter in playerRanges)
                    {
                        var tempProducts = products;

                        if (playersFilter.Min.HasValue && playersFilter.Min.Value != 0)
                        {
                            tempProducts = tempProducts.Where(p => p.MinPlayers >= playersFilter.Min.Value);
                        }

                        if (playersFilter.Max.HasValue && playersFilter.Max.Value != 0)
                        {
                            tempProducts = tempProducts.Where(p => p.MaxPlayers <= playersFilter.Max.Value);
                        }

                        playerFilteredProducts.AddRange(tempProducts);
                    }

                    products = playerFilteredProducts.Distinct().ToList();
                }
            }

            if (filterRequest.Price != null && filterRequest.Price.Any())
            {
                var priceRanges = filterRequest.Price.Where(p => (p.Min.HasValue && p.Min.Value != 0) || (p.Max.HasValue && p.Max.Value != 0)).ToList();

                if (priceRanges.Any())
                {
                    var priceFilteredProducts = new List<ProductFullDTO>();

                    foreach (var priceFilter in priceRanges)
                    {
                        var tempProducts = products;

                        if (priceFilter.Min.HasValue && priceFilter.Min.Value != 0)
                        {
                            tempProducts = tempProducts.Where(p => p.Price >= priceFilter.Min.Value);
                        }

                        if (priceFilter.Max.HasValue && priceFilter.Max.Value != 0)
                        {
                            tempProducts = tempProducts.Where(p => p.Price <= priceFilter.Max.Value);
                        }

                        priceFilteredProducts.AddRange(tempProducts);
                    }

                    products = priceFilteredProducts.Distinct().ToList();
                }
            }

            if (filterRequest.GameTime != null && filterRequest.GameTime.Any())
            {
                var gameTimeRanges = filterRequest.GameTime.Where(g => (g.Min.HasValue && g.Min.Value != 0) || (g.Max.HasValue && g.Max.Value != 0)).ToList();

                if (gameTimeRanges.Any())
                {
                    var gameTimeFilteredProducts = new List<ProductFullDTO>();

                    foreach (var gameTimeFilter in gameTimeRanges)
                    {
                        var tempProducts = products;

                        if (gameTimeFilter.Min.HasValue && gameTimeFilter.Min.Value != 0)
                        {
                            tempProducts = tempProducts.Where(p => p.MinGameTimeMinutes >= gameTimeFilter.Min.Value);
                        }

                        if (gameTimeFilter.Max.HasValue && gameTimeFilter.Max.Value != 0)
                        {
                            tempProducts = tempProducts.Where(p => p.MaxGameTimeMinutes <= gameTimeFilter.Max.Value);
                        }

                        gameTimeFilteredProducts.AddRange(tempProducts);
                    }

                    products = gameTimeFilteredProducts.Distinct().ToList();
                }
            }

            return products;
        }

        internal IEnumerable<ProductFullDTO> ApplySorting(IEnumerable<ProductFullDTO> products, string sortOrder)
        {
            switch (sortOrder)
            {
                case "price_desc":
                    products = products.OrderByDescending(p => p.Price);
                    break;
                case "price_asc":
                    products = products.OrderBy(p => p.Price);
                    break;
                case "name_asc":
                    products = products.OrderBy(p => p.Name);
                    break;
                case "name_desc":
                    products = products.OrderByDescending(p => p.Name);
                    break;
                default:
                    break;
            }
            return products;
        }

        internal IEnumerable<ProductFullDTO> ApplySearching(IEnumerable<ProductFullDTO> products, ProductSearchTerm filterRequest)
        {
            if (!string.IsNullOrEmpty(filterRequest.SearchTerm))
            {
                var searchTerm = filterRequest.SearchTerm.ToLower();
                products = products.Where(p =>
                    p.Name.ToLower().Contains(searchTerm) ||
                    p.Tags.Any(t => t.Name.ToLower().Contains(searchTerm))
                ).ToList();
            }

            return products;
        }

        internal IEnumerable<ProductFullDTO> ApplyRandomProductFilters(IEnumerable<ProductFullDTO> products, ProductRandomRequest filterRequest)
        {

            if (filterRequest.Categories != null && filterRequest.Categories.Any(c => c.HasValue && c.Value != 0))
            {
                products = products.Where(p => p.Category != null && filterRequest.Categories.Contains(p.Category.Id));
            }

            if (filterRequest.Ages != null && filterRequest.Ages.Any())
            {
                var ageRanges = filterRequest.Ages.Where(a => (a.Min.HasValue && a.Min.Value != 0) || (a.Max.HasValue && a.Max.Value != 0)).ToList();

                if (ageRanges.Any())
                {
                    var ageFilteredProducts = new List<ProductFullDTO>();

                    foreach (var ageFilter in ageRanges)
                    {
                        var tempProducts = products;

                        if (ageFilter.Min.HasValue && ageFilter.Min.Value != 0)
                        {
                            tempProducts = tempProducts.Where(p => p.MinAge >= ageFilter.Min.Value);
                        }

                        if (ageFilter.Max.HasValue && ageFilter.Max.Value != 0)
                        {
                            tempProducts = tempProducts.Where(p => p.MinAge <= ageFilter.Max.Value);
                        }

                        ageFilteredProducts.AddRange(tempProducts);
                    }

                    products = ageFilteredProducts.Distinct().ToList();
                }
            }

            if (filterRequest.PlayersAmount != null && filterRequest.PlayersAmount.Any())
            {
                var playerRanges = filterRequest.PlayersAmount.Where(p => (p.Min.HasValue && p.Min.Value != 0) || (p.Max.HasValue && p.Max.Value != 0)).ToList();

                if (playerRanges.Any())
                {
                    var playerFilteredProducts = new List<ProductFullDTO>();

                    foreach (var playersFilter in playerRanges)
                    {
                        var tempProducts = products;

                        if (playersFilter.Min.HasValue && playersFilter.Min.Value != 0)
                        {
                            tempProducts = tempProducts.Where(p => p.MinPlayers >= playersFilter.Min.Value);
                        }

                        if (playersFilter.Max.HasValue && playersFilter.Max.Value != 0)
                        {
                            tempProducts = tempProducts.Where(p => p.MaxPlayers <= playersFilter.Max.Value);
                        }

                        playerFilteredProducts.AddRange(tempProducts);
                    }

                    products = playerFilteredProducts.Distinct().ToList();
                }
            }

            return products;
        }
    }
}