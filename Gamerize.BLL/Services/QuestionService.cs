using AutoMapper;
using Gamerize.BLL.Models;
using Gamerize.BLL.Specifications;
using Gamerize.Common.Extensions.Exceptions;
using Gamerize.DAL.Entities.Shop;
using Gamerize.DAL.Repositories.Interfaces;
using Gamerize.DAL.UnitOfWork.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Gamerize.BLL.Services
{
    public class QuestionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Question> _questionRepository;
        private readonly IRepository<Answer> _answerRepository;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;

        public QuestionService(IUnitOfWork unitOfWork, IMapper mapper, IEmailSender emailSender)
        {
            _unitOfWork = unitOfWork;
            _questionRepository = _unitOfWork.GetRepository<Question>();
            _answerRepository = _unitOfWork.GetRepository<Answer>();
            _mapper = mapper;
            _emailSender = emailSender;
        }

        #region Question's methods
        public async Task<QuestionDTO> GetQuestionAsync(int questionId) =>
    _mapper.Map<QuestionDTO>(await _questionRepository.GetByIdAsync(questionId)) ??
        throw new InvalidIdException($"Питання з Id: {questionId} не знайдено!");

        public async Task<QuestionDTO> AddQuestionAsync(QuestionCreateDTO question)
        {
            try
            {
                var newQuestion = new Question
                {
                    Id = default,
                    DateTime = DateTime.Now,
                    UserName = question.UserName,
                    Email = question.Email,
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

                
                currentQuestion.UserName = question.UserName;
                currentQuestion.Text = question.Text;
                currentQuestion.Email = question.Email;
                currentQuestion.DateTime = DateTime.Now;

                await _unitOfWork.SaveChangesAsync();
                return _mapper.Map<QuestionDTO>(currentQuestion);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task DeleteQuestionAsync(List<int> ids)
        {
            try
            {
                foreach (int id in ids)
                {
                    var currentQuestion = await _questionRepository.GetByIdAsync(id) ??
                        throw new InvalidIdException($"Питання з Id: {id} не знайдено!");

                    if (currentQuestion.Answer != null)
                    {
                        await _answerRepository.DeleteAsync(currentQuestion.Answer);
                    }

                    await _questionRepository.DeleteAsync(currentQuestion);
                }

                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<(ICollection<QuestionDTO>, int totalPages, int totalMessages)> GetAllAsync(int totalQuestions, int pages)
        {
            try
            {
                var allQuestions = await _questionRepository.GetAllQuestionWithAnswerByIdAsync();

                var sortedQuestions = allQuestions
                    .OrderByDescending(q => q.IsStarred)
                    .ThenBy(q => q.Answer == null)
                    .ThenByDescending(q => q.DateTime)
                    .ToList();

                var totalCount = allQuestions.Count;
                var totalPages = (int)Math.Ceiling((double)totalCount / totalQuestions);

                var paginatedQuestions = sortedQuestions
                    .Skip((pages - 1) * totalQuestions)
                    .Take(totalQuestions)
                    .ToList();

                return(_mapper.Map<ICollection<QuestionDTO>>(paginatedQuestions), totalPages, totalCount);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<QuestionDTO> GetByIdAsync(int id)
        {
            try
            {
                var question = await _questionRepository.GetQuestionWithAnswerByIdAsync(id);
                return _mapper.Map<QuestionDTO>(question) ??
                    throw new InvalidIdException(ExceptionMessage(id));
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<QuestionDTO> PostIsStarredAsync(int id)
        {
            try
            {
                var question = await _questionRepository.GetByIdAsync(id) ??
                    throw new InvalidIdException($"Питання з Id: {id} не знайдено!");

                question.IsStarred = !question.IsStarred;

                await _unitOfWork.SaveChangesAsync();

                return _mapper.Map<QuestionDTO>(question);
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

                var questionDTO = _mapper.Map<QuestionDTO>(question);

                if (question.IsAnswered)
                {
                    throw new InvalidIdException($"Питання з Id: {questionId} вже має відповідь!");
                }

                question.IsAnswered = true;

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

                await _emailSender.SendEmailAsync(
                    questionDTO.Email,
                    "Відповідь на запитання",
                    $"Вітаємо, шановний {questionDTO.UserName}! Ви залишали запитання на сайті Gamerise!<br/><br/>" +
                    $"Наші адміністратори розглянули ваше питання:<br/>" +
                    $"<strong>{questionDTO.Text}</strong><br/><br/>" +
                    $"та надали відповідь на запитання:<br/>" +
                    $"<strong>{newAnswer.Text}</strong>"
                );

                return _mapper.Map<AnswerDTO>(newAnswer);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        //______________________________________________________________________

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

        public async Task DeleteAnswerAsync(List<int> ids)
        {
            try
            {
                foreach (int id in ids)
                {
                    var answer = await _answerRepository.GetByIdAsync(id) ??
                        throw new InvalidIdException($"Відповіді з Id: {id} вже/ще не існує!");
                    var question = await _questionRepository.GetByIdAsync(answer.QuestionId) ??
                        throw new InvalidIdException($"Питання з Id: {id} вже/ще не існує!");
                    question.IsAnswered = false;

                    await _answerRepository.DeleteAsync(answer);
                }

                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        public async Task<ICollection<AnswerDTO>> GetAllAnswerAsync()
        {
            try
            {
                return _mapper.Map<ICollection<AnswerDTO>>(await _answerRepository.GetAllAsync());
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }
        #endregion

        public async Task<(ICollection<QuestionDTO>, int totalPages)> SearchAsync(string term, int totalQuestions, int page)
        {
            try
            {
                var questions = await _questionRepository.GetAllQuestionWithAnswerByIdAsync();

                var filteredQuestions = questions
                    .Where(q => q.Text.Contains(term, StringComparison.OrdinalIgnoreCase) ||
                                q.UserName.Contains(term, StringComparison.OrdinalIgnoreCase))
                    .ToList();

                var totalCount = filteredQuestions.Count;
                var totalPages = (int)Math.Ceiling((double)totalCount / totalQuestions);

                var paginatedQuestions = filteredQuestions
                    .Skip((page - 1) * totalQuestions)
                    .Take(totalQuestions)
                    .ToList();

                return (_mapper.Map<ICollection<QuestionDTO>>(paginatedQuestions), totalPages);
            }
            catch (DbUpdateException ex)
            {
                throw new ServerErrorException(ex.Message, ex);
            }
        }

        private string ExceptionMessage(object? value = null) =>
            value switch
            {
                int idt when value is int => $"Питання з id: {idt} ще/вже не існує!",
                string namet when value is string => $"Питання з назваю {namet} вже існує",
                _ => "Something has gone wrong"
            };
    }
}
