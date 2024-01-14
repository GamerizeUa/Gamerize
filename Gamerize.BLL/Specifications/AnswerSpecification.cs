using Gamerize.DAL.Entities.Shop;

namespace Gamerize.BLL.Specifications
{
	public class AnswerSpecification : Specification<Answer>
	{
		public AnswerSpecification ByQuestionId(int questionId)
		{
			Where(x => x.QuestionId == questionId);
			return this;
		}
	}
}
