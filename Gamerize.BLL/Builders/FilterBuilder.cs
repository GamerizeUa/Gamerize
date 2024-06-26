using Gamerize.BLL.Models;
using Gamerize.BLL.Models.Requests;
using Gamerize.DAL.Entities.Shop;

namespace Gamerize.BLL.Builder
{
    public class FilterBuilder
    {
        internal IEnumerable<ProductFullDTO> ApplyFilters(IEnumerable<ProductFullDTO> products, ProductListFilterRequest filterRequest)
        {
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

            if (filterRequest.Ages != null)
            {
                if (filterRequest.Ages.Min.HasValue && filterRequest.Ages.Min.Value != 0)
                {
                    products = products.Where(p => p.MinAge >= filterRequest.Ages.Min.Value);
                }
                if (filterRequest.Ages.Max.HasValue && filterRequest.Ages.Max.Value != 0)
                {
                    products = products.Where(p => p.MinAge <= filterRequest.Ages.Max.Value);
                }
            }

            if (filterRequest.PlayersAmount != null)
            {
                if (filterRequest.PlayersAmount.Min.HasValue && filterRequest.PlayersAmount.Min.Value != 0)
                {
                    products = products.Where(p => p.MinPlayers >= filterRequest.PlayersAmount.Min.Value);
                }
                if (filterRequest.PlayersAmount.Max.HasValue && filterRequest.PlayersAmount.Max.Value != 0)
                {
                    products = products.Where(p => p.MaxPlayers <= filterRequest.PlayersAmount.Max.Value);
                }
            }

            if (filterRequest.Price != null)
            {
                if (filterRequest.Price.Min.HasValue && filterRequest.Price.Min.Value != 0)
                {
                    products = products.Where(p => p.Price >= filterRequest.Price.Min.Value);
                }
                if (filterRequest.Price.Max.HasValue && filterRequest.Price.Max.Value != 0)
                {
                    products = products.Where(p => p.Price <= filterRequest.Price.Max.Value);
                }
            }

            if (filterRequest.GameTime != null)
            {
                if (filterRequest.GameTime.Min.HasValue && filterRequest.GameTime.Min.Value != 0)
                {
                    products = products.Where(p => p.MinGameTimeMinutes >= filterRequest.GameTime.Min.Value);
                }
                if (filterRequest.GameTime.Max.HasValue && filterRequest.GameTime.Max.Value != 0)
                {
                    products = products.Where(p => p.MaxGameTimeMinutes <= filterRequest.GameTime.Max.Value);
                }
            }

            return products;
        }
    }
}