using Gamerize.DAL.Entities.Shop;

namespace Gamerize.BLL.Specifications
{
	public class QuestionSpecification : Specification<Question>
	{
		public QuestionSpecification ById(int id) {
			Where(x => x.Id == id);
			return this;
		}
		public QuestionSpecification IncludeAll()
		{
			Include(x => x.Answer);
			return this;
		}
	}
}
