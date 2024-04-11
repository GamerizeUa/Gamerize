using Gamerize.BLL.Models;
using Gamerize.BLL.Models.Interfaces;
using Gamerize.BLL.Services;
using Gamerize.BLL.Services.Interfaces;
using Gamerize.Common.Extensions.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    public class QuestionController : ControllerBase
    {
        private readonly QuestionService _questionService;

        public QuestionController(QuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpGet("/api/Question/GetAll")]
        public async Task<ActionResult<ICollection<QuestionDTO>>> GetAllAsync()
        {
            try
            {
                return Ok(await _questionService.GetAllAsync());
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("/api/Question/GetById/{id:int}")]
        public async Task<ActionResult<QuestionDTO>> GetByIdAsync(int id)
        {
            try
            {
                return Ok(await _questionService.GetByIdAsync(id));
            }
            catch (InvalidIdException ex)
            {
                return StatusCode(404, ex.Message);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Questions")]
        public async Task<ActionResult<QuestionDTO>> PostQuestionForProduct([FromBody] QuestionCreateDTO questionDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                return Ok(await _questionService.AddQuestionAsync(questionDTO));
            }
            catch (InvalidIdException ex)
            {
                return StatusCode(404, ex.Message);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("Question/{id:int}")]
        public async Task<IActionResult> DeleteQuestionAsync(int id)
        {
            try
            {
                await _questionService.DeleteQuestionAsync(id);

                return StatusCode(204);
            }
            catch (InvalidIdException ex)
            {
                return StatusCode(404, ex.Message);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Questions/{questionId}/Answer")]
        public async Task<ActionResult<AnswerDTO>> PostAnswerForQuestion(int questionId, AnswerCreateDTO answerDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                await _questionService.GetQuestionAsync(questionId);

                return Ok(await _questionService.AddAnswerAsync(questionId, answerDTO));
            }
            catch (InvalidIdException ex)
            {
                return StatusCode(404, ex.Message);
            }
            catch (ServerErrorException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
