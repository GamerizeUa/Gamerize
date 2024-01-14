using Gamerize.DAL.Entities.Shop;

namespace Gamerize.BLL.Models.Interfaces
{
	public interface IQuestionService
	{
		Task<Question> GetQuestionAsync(int questionId);
		Task<IEnumerable<Question>> GetQuestionsForProductAsync(int productId);
		Task<Answer> GetAnswerForQuestionAsync(int questionId);
		Task AddQuestionAsync(Question question);
		Task AddAnswerAsync(Answer answer);
	}
}
