using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.BLL.Specifications;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;

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

        #region Question's methods
        public async Task<QuestionDTO> GetQuestionAsync(int questionId) =>
            _mapper.Map<QuestionDTO>(await _questionRepository.GetByIdAsync(questionId)) ??
                throw new InvalidIdException($"Питання з Id: {questionId} не знайдено!");

        public async Task<ICollection<QuestionDTO>> GetQuestionsForProductAsync(int productId) =>
            _mapper.Map<ICollection<QuestionDTO>>(await _questionRepository.GetAllAsync(
                 new QuestionSpecification().ByProductId(productId).IncludeAll()));

        public async Task<QuestionDTO> AddQuestionAsync(int productId, QuestionCreateDTO question)
        {
            try
            {
                var newQuestion = new Question
                {
                    Id = default,
                    ProductId = productId,
                    DateTime = DateTime.Now,
                    UserName = question.UserName,
                    Text = question.Text,
                    IsAnswered = false
                };
                await _questionRepository.AddAsync(newQuestion);
                await _unitOfWork.SaveChangesAsync();
                return _mapper.Map<QuestionDTO>(newQuestion);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        public async Task<QuestionDTO> EditQuestionAsync(int id, QuestionCreateDTO question)
        {
            try
            {
                var currentQuestion = await _questionRepository.GetByIdAsync(id) ??
                    throw new InvalidIdException($"Питання з Id: {id} не знайдено!");
                currentQuestion.Text = question.Text;
                currentQuestion.DateTime = DateTime.Now;
                await _unitOfWork.SaveChangesAsync();
                return _mapper.Map<QuestionDTO>(currentQuestion);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        public async Task DeleteQuestionAsync(int id)
        {
            try
            {
                var currentQuestion = await _questionRepository.GetByIdAsync(id) ??
                    throw new InvalidIdException($"Питання з Id: {id} не знайдено!");
                await _questionRepository.DeleteAsync(currentQuestion);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        #endregion
        #region Answer's methods
        public async Task<AnswerDTO> GetAnswerForQuestionAsync(int questionId) =>
            _mapper.Map<AnswerDTO>((await _answerRepository.GetAllAsync(
                 new AnswerSpecification().ByQuestionId(questionId))).FirstOrDefault()) ??
            throw new InvalidIdException($"Питання з Id: {questionId} немає відповіді!");

        public async Task<AnswerDTO> AddAnswerAsync(int questionId, AnswerCreateDTO answer)
        {
            try
            {
                var question = await _questionRepository.GetByIdAsync(questionId) ??
                    throw new InvalidIdException($"Питання з Id: {questionId} не знайдено!");

                question.IsAnswered = !question.IsAnswered
                    ? true
                    : throw new InvalidIdException($"Питання з Id: {questionId} вже має відповідь!");

                var newAnswer = new Answer
                {
                    Id = default,
                    QuestionId = questionId,
                    Question = question,
                    ManagerName = answer.ManagerName,
                    DateTime = DateTime.Now,
                    Text = answer.Text
                };

                await _answerRepository.AddAsync(newAnswer);
                await _unitOfWork.SaveChangesAsync();
                return _mapper.Map<AnswerDTO>(newAnswer);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<AnswerDTO> EditAnswerAsync(int answerId, AnswerCreateDTO answer)
        {
            try
            {
                var currentAnswer = await _answerRepository.GetByIdAsync(answerId) ??
                    throw new InvalidIdException($"Відповіді з Id: {answerId} не знайдено!");

                currentAnswer.ManagerName = answer.ManagerName;
                currentAnswer.Text = answer.Text;
                currentAnswer.DateTime = DateTime.Now;

                await _unitOfWork.SaveChangesAsync();
                return _mapper.Map<AnswerDTO>(currentAnswer);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task DeleteAnswerAsync(int id)
        {
            try
            {
                var answer = await _answerRepository.GetByIdAsync(id) ??
                    throw new InvalidIdException($"Відповіді з Id: {id} вже/ще не існує!");
                var question = await _questionRepository.GetByIdAsync(answer.QuestionId) ??
                    throw new InvalidIdException($"Питання з Id: {id} вже/ще не існує!");
                question.IsAnswered = false;

                await _answerRepository.DeleteAsync(answer);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        #endregion
    }
}
