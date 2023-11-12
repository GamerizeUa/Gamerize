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
        }
    }
}
