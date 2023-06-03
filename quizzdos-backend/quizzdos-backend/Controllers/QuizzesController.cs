using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using quizzdos_backend.DTOs;
using quizzdos_backend.Repositories;
using quizzdos_EFCore.Entities.Courses;
using quizzdos_EFCore.Enums;
using System.ComponentModel.DataAnnotations;

namespace quizzdos_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizzesController : ControllerBase
    {
        private readonly IQuizRepository quizRepository;

        public QuizzesController (IQuizRepository quizRepository)
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
        [HttpPost("grade")]
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult> GradeQuiz([FromBody] GradeQuizInput gradeDetils)
        {
            var successfulGraded = await quizRepository.AddQuizGrade(gradeDetils.QuizId, gradeDetils.PersonId, gradeDetils.QuizGrade);
            if (successfulGraded == null)
                return BadRequest($"Couldn't find a match for quizId {gradeDetils.QuizId} and personId {gradeDetils.PersonId}");

            if (!successfulGraded.Value)
            {
                return BadRequest("Quiz must be between 0 and 10");
            }

            return Ok(successfulGraded);
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
        public async Task<ActionResult> UpdateQuizStatus(Guid quizId, EQuizStatus status)
        {
            var qz = await quizRepository.UpdateQuizStatus(quizId, status);
            if (qz == null)
                return NotFound($"Quiz: {quizId} was not found!");
            return Ok(qz);
        }

        [HttpPut("{quizId:Guid}/questions")]
        [ProducesResponseType(typeof(List<QuizQuestionDTO>), 200)]
        [ProducesResponseType(typeof(string), 404)]
        public async Task<ActionResult> UpdateQuizQuestions(Guid quizId, List<QuizQuestionDTO> newQuestions)
        {
            var qz = await quizRepository.UpdateQuizQuestions(quizId, newQuestions);
            if (qz == null)
                return NotFound($"Quiz: {quizId} was not found!");

            return Ok(qz);
        }
        [HttpGet("{quizzId:Guid}/questions")]
        [ProducesResponseType(typeof(List<QuestionDTO>), 200)]
        [ProducesResponseType(typeof(string), 404)]
        public async Task<ActionResult> GetQuizQuestions(Guid quizzId)
        {
            var qz = await quizRepository.GetQuizQuestions(quizzId);
            if (qz == null)
                return NotFound($"Quiz: {quizzId} was not found!");
            return Ok(qz);
        }
        [HttpGet("{personId:Guid}/{quizzId:Guid}")]
        [ProducesResponseType(typeof(StartQuizDTO), 200)]
        [ProducesResponseType(typeof(string), 404)]
        public async Task<ActionResult> StartQuiz(Guid quizzId, Guid personId)
        {
            var qz = await quizRepository.GetQuizForStudent(quizzId, personId);
            
            if (qz == null)
                return NotFound($"Quiz: {quizzId} was not found!");

            return Ok(qz);
        }

    }
}
