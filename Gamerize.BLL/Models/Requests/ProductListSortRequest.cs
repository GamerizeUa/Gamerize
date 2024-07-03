using Gamerize.BLL.Models.Interfaces;

namespace Gamerize.BLL.Models.Requests
{
    public class ProductListSortRequest: IEntity
    {
        public int Id { get; set; }
        public string? SortOrder { get; set; }
    }
}
