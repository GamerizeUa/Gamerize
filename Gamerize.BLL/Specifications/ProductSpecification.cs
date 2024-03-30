using Gamerize.DAL.Entities.Shop;

namespace Gamerize.BLL.Specifications
{
    public class ProductSpecification : Specification<Product>
    {
        public ProductSpecification ById(int id)
        {
            Where(x => x.Id == id);
            return this;
        }

        public ProductSpecification IncludeAll()
        {
            Include(x => x.Category);
            Include(x => x.Genre);
            Include(x => x.Language);
            Include(x => x.Theme);
            Include(x => x.Feedbacks);
            Include(x => x.Tags);
            Include(x => x.Images);
            return this;
        }
        public ProductSpecification IncludeShort()
        {
            Include(x => x.Images);
            Include(x => x.Feedbacks);
            return this;
        }
    }
}
