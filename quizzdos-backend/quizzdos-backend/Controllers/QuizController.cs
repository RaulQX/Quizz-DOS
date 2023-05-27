using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using quizzdos_backend.DTOs;
using quizzdos_backend.Repositories;
using quizzdos_EFCore.Entities.Courses;
using quizzdos_EFCore.Enums;

namespace quizzdos_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IQuizRepository quizRepository;

        public QuizController (IQuizRepository quizRepository)
        {
            this.quizRepository = quizRepository;
        }

        [HttpPost]
        [ProducesResponseType(typeof(QuizDTO), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult> AddQuiz(QuizDTO quiz)
        {
            var qz = await quizRepository.AddQuizAsync(quiz);
            if (qz == null)
                return BadRequest($"Failed to add quiz: {quiz.Name}");

            return Ok(qz);
        }

        [HttpDelete]
        [ProducesResponseType(typeof(Quiz), 200)]
        [ProducesResponseType(typeof(string), 404)]
        public async Task<ActionResult> DeleteQuiz(Guid quizId)
        {
            var quiz = await quizRepository.DeleteQuizAsync(quizId);
            if (quiz == null)
                return NotFound($"Quiz: {quizId} was not found!");
            return Ok(quiz);
        }

        [HttpPut]
        [ProducesResponseType(typeof(UpdateQuizDTO), 200)]
        [ProducesResponseType(typeof(string), 404)]
        public async Task<ActionResult> UpdateQuiz(Guid quizId, UpdateQuizDTO quiz)
        {
            var qz = await quizRepository.UpdateQuizAsync(quizId, quiz);
            if (qz == null)
                return NotFound($"Quiz: {quizId} was not found!");

            return Ok(qz);
        }

        [HttpPut("{quizId:Guid}/{status:int}")]
        [ProducesResponseType(typeof(AccessedQuizDTO), 200)]
        [ProducesResponseType(typeof(string), 404)]
        public async Task<ActionResult> UpdateQuizStatus(Guid quizId, QuizStatus status)
        {
            var qz = await quizRepository.UpdateQuizStatus(quizId, status);
            if (qz == null)
                return NotFound($"Quiz: {quizId} was not found!");
            return Ok(qz);
        }


    }
}
