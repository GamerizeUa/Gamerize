using Gamerize.BLL.Models;
using Gamerize.DAL.Entities.Shop;

namespace Gamerize.BLL.AutoMapper
{
	public static class AutoMapperHelper
	{
		public static double CalculateAverageRating(ICollection<Feedback> feedbacks)
		{
			if (feedbacks != null && feedbacks.Any())
				return feedbacks.Average(f => f.Rate);
			return 0.0;
		}
	}
}
