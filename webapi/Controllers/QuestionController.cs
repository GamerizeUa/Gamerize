using Gamerize.BLL.Models;
using Gamerize.BLL.Services;
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
        [HttpPut("Question/{id:int}")]
        public async Task<ActionResult<QuestionDTO>> EditQuestionAsync(int id, [FromBody] QuestionCreateDTO questionDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                return Ok(await _questionService.EditQuestionAsync(id, questionDTO));
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
