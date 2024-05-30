using Gamerize.BLL.Models;
using Gamerize.BLL.Models.Requests;
using Gamerize.BLL.Specifications;
using Gamerize.DAL.Entities.Shop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gamerize.BLL.Builder
{
    public class FilterBuilder
    {
        public IQueryable<Product> BuildProductFilter(IQueryable<Product> query, ProductListFilterRequest request)
        {

            var actions = new Dictionary<string, Action>
            {
                { nameof(request.MindGames), () => query = ByMindGames(query, request.MindGames) },
                { nameof(request.Languages), () => query = ByLanguages(query, request.Languages) },
                { nameof(request.Ages), () => query = ByAge(query,request.Ages) },
                { nameof(request.PlayersAmount), () => query = ByPlayersAmount(query, request.PlayersAmount) },
                { nameof(request.Categories), () => query = ByCategory(query, request.Categories) },
                { nameof(request.GameTime), () => query = ByGameTime(query, request.GameTime) },
                { nameof(request.Genres), () => query = ByGenres(query, request.Genres) },
                { nameof(request.Price), () => query = ByPrice(query,request.Price) },
                { nameof(request.Puzzles), () => query = ByPuzzles(query, request.Puzzles) },
                { nameof(request.Themes), () =>  query = ByThemes(query,request.Themes) },
            };

            foreach (var action in actions)
            {
                var property = typeof(ProductListFilterRequest).GetProperty(action.Key);
                if (property != null && property.GetValue(request) != null)
                {
                    action.Value.Invoke();
                }
            }

            return query;

        }


        private IQueryable<Product> ByCategory(IQueryable<Product> query, List<int?> categories)
        {
            query = query.Where(x => categories.Contains(x.CategoryId));
            return query;
        }

        private IQueryable<Product> ByGenres(IQueryable<Product> query, List<int?> genres)
        {
            query = query.Where(x => genres.Contains(x.GenreId));
            return query;
        }

        private IQueryable<Product> ByLanguages(IQueryable<Product> query, List<int?> languages)
        {
            query = query.Where(x => languages.Contains(x.LanguageId));
            return query;
        }

        private IQueryable<Product> ByMindGames(IQueryable<Product> query, List<int?> mindGames)
        {
            query = query.Where(x => mindGames.Contains(x.MindGamesId));
            return query;
        }

        private IQueryable<Product> ByPuzzles(IQueryable<Product> query, List<int?> puzzles)
        {
            query = query.Where(x => puzzles.Contains(x.PuzzleId));
            return query;
        }

        private IQueryable<Product> ByThemes(IQueryable<Product> query, List<int?> themes)
        {
            query = query.Where(x => themes.Contains(x.ThemeId));
            return query;
        }

        private IQueryable<Product> ByAge(IQueryable<Product> query, NumericFilterParameter ageFilter)
        {
            query = query.Where(x => x.MinAge >= ageFilter.Min);
            return query;
        }
        private IQueryable<Product> ByPlayersAmount(IQueryable<Product> query, NumericFilterParameter playersAmountFilter)
        {
            query = query.Where(x => x.MinPlayers >= playersAmountFilter.Min
                && x.MaxPlayers <= playersAmountFilter.Max);
            return query;
        }

        private IQueryable<Product> ByPrice(IQueryable<Product> query, NumericFilterParameter priceFilter)
        {
            query = query.Where(x => x.Price >= priceFilter.Min
                && x.Price <= priceFilter.Max);
            return query;
        }

        public IQueryable<Product> ByGameTime(IQueryable<Product> query, NumericFilterParameter gameTimeFilter)
        {
            query = query.Where(x => x.MinGameTimeMinutes >= gameTimeFilter.Min
                && x.MaxGameTimeMinutes <= gameTimeFilter.Max);
            return query;
        }

    }
}
