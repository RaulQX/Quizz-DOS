using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using quizzdos_backend.DTOs;
using quizzdos_backend.Repositories;

namespace quizzdos_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsRepository _statisticsRepository;

        public StatisticsController(IStatisticsRepository statisticsRepository)
        {
            _statisticsRepository = statisticsRepository;
        }

        [HttpGet("students/{personId:Guid}")]
        [ProducesResponseType(typeof(CourseStudentStatisticsDTO), 200)]
        [ProducesResponseType(typeof(string), 404)]
        public async Task<ActionResult<CourseStudentStatisticsDTO?>> GetStudentCourseStatistics(Guid personId)
        {
            var statistics = await _statisticsRepository.GetStudentsCourseStatisticsAsync(personId);
            if (statistics == null)
                return NotFound($"Cannot find statistics for person with id: {personId}");

            return Ok(statistics);
        }

        [HttpGet("professors/{personId:Guid}")]
        [ProducesResponseType(typeof(CourseStudentStatisticsDTO), 200)]
        [ProducesResponseType(typeof(string), 404)]
        public async Task<ActionResult<CourseProfessorStatisticsDTO?>> GetProfessorCourseStatistics(Guid personId, int pageParam = 1, int pageSize = 1)
        {
            var statistics = await _statisticsRepository.GetProfessorsStatisticsAsync(personId, pageParam, pageSize);
            if (statistics == null)
                return NotFound($"Cannot find statistics for person with id: {personId}");

            return Ok(statistics);
        }
    }
}
