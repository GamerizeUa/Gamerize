using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.DAL.Entities.Shop;

namespace Gamerize.BLL.AutoMapper
{
	public class ToDtoMappingProfile : Profile
	{
		public ToDtoMappingProfile()
		{
			CreateMap<Category, CategoryDTO>().ReverseMap();
			CreateMap<Product, ProductFullDTO>();
			CreateMap<Product, ProductShortDTO>()
				.ForMember(dest => dest.GameRateAvg,
				opt => opt.MapFrom(o => AutoMapperHelper.CalculateAverageRating(o.Feedbacks)))
				.ForMember(img => img.ImagePath,
				  opt => opt.MapFrom(o => o.Images.FirstOrDefault().Path));
			CreateMap<Feedback, FeedbackDTO>().ReverseMap();
			CreateMap<Genre, GenreDTO>().ReverseMap();
			CreateMap<Language, LanguageDTO>().ReverseMap();
			CreateMap<Theme, ThemeDTO>().ReverseMap();
			CreateMap<Tag, TagDTO>().ReverseMap();
			CreateMap<Image, ImageDTO>().ReverseMap();
		}
	}
}
