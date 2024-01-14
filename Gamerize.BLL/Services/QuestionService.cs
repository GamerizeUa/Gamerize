using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.BLL.Specifications;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;

namespace Gamerize.BLL.Services
{
	public class QuestionService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IRepository<Question> _questionRepository;
		private readonly IRepository<Answer> _answerRepository;
		private readonly IMapper _mapper;

		public QuestionService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_questionRepository = _unitOfWork.GetRepository<Question>();
			_answerRepository = _unitOfWork.GetRepository<Answer>();
			_mapper = mapper;
		}

		public async Task<QuestionDTO> GetQuestionAsync(int questionId) =>
			_mapper.Map<QuestionDTO>(await _questionRepository.GetByIdAsync(questionId)) ??
				throw new InvalidIdException($"Питання з Id: {questionId} не знайдено!");

		public async Task<ICollection<QuestionDTO>> GetQuestionsForProductAsync(int productId) =>
			_mapper.Map<ICollection<QuestionDTO>>(await _questionRepository.GetAllAsync(
				 new QuestionSpecification().ByProductId(productId).IncludeAll()));


		public async Task<AnswerDTO> GetAnswerForQuestionAsync(int questionId) =>
			_mapper.Map<AnswerDTO>((await _answerRepository.GetAllAsync(
				 new AnswerSpecification().ByQuestionId(questionId))).FirstOrDefault()) ??
			throw new InvalidIdException($"Питання з Id: {questionId} немає відповіді!");

		public async Task AddQuestionAsync(int productId, QuestionCreateDTO question)
		{
			var newQuestion = new Question
			{
				Id = default,
				ProductId = productId,
				DateTime = DateTime.Now,
				UserName = question.UserName,
				Text = question.Text
			};
			await _questionRepository.AddAsync(newQuestion);
			await _unitOfWork.SaveChangesAsync();
		}

		public async Task AddAnswerAsync(int questionId, AnswerCreateDTO answer)
		{
			var question = await _questionRepository.GetByIdAsync(questionId) ??
				throw new InvalidIdException($"Питання з Id: {questionId} не знайдено!");
			question.IsAnswered = true;

			var newAnswer = new Answer
			{
				Id = default,
				QuestionId = questionId,
				ManagerName = answer.ManagerName,
				DateTime = DateTime.Now,
				Text = answer.Text
			};

			await _answerRepository.AddAsync(newAnswer);
			await _unitOfWork.SaveChangesAsync();
		}
	}
}
