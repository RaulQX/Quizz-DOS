using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using quizzdos_backend.DTOs;
using quizzdos_backend.Paging;
using quizzdos_backend.Repositories;
using quizzdos_EFCore.Entities.Courses;

namespace quizzdos_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;

        public CoursesController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        [HttpGet("{courseId:Guid}")]
        [ProducesResponseType(typeof(Course), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult> GetCourse(Guid courseId)
        {
            var course = await _courseRepository.GetCourseByIdAsync(courseId);
            if (course == null)
                return NotFound($"Course: {courseId} was not found!");
            return Ok(course);
        }

        [HttpPost]
        [ProducesResponseType(typeof(CourseDTO), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult> AddCourse(CourseDTO course)
        {
            var crs = await _courseRepository.AddCourseAsync(course);
            if (crs == null)
                return BadRequest($"Failed to add course: {course.Name}");

            return Ok(crs);
        }

        [HttpDelete]
        [ProducesResponseType(typeof(Course), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult> DeleteCourse(Guid courseId)
        {
           var course = await _courseRepository.DeleteCourseAsync(courseId);
            if (course == null)
                return NotFound($"Course: {courseId} was not found!");
            return Ok(course);
        }

        [HttpPut]
        [ProducesResponseType(typeof(Course), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult> UpdateCourse(Guid courseId, CourseDTO course)
        {
            var crs = await _courseRepository.UpdateCourseAsync(courseId, course);
            if (crs == null)
                return NotFound($"Course: {courseId} was not found!");
            return Ok(crs);
        }

        [HttpGet("creators/{creatorId:Guid}")]
        [ProducesResponseType(typeof(PaginatedResponse<DiplayCourseDTO>), 200)]
        public async Task<ActionResult> GetCreatedCoursesPaged(Guid creatorId, int pageParam = 1, int pageSize = 1)
        {
            var courses = await _courseRepository.GetCreatedCoursesPaged(creatorId, pageParam, pageSize);
            return Ok(courses);
        }

        [HttpPost("{courseCode}/people/{personId}")]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult> AddPersonToCourse(string courseCode, Guid personId)
        {
            var result = await _courseRepository.AddPersonToCourse(courseCode, personId);
            if (result == false)
                return BadRequest($"Failed to add person: {personId} to course: {courseCode}");

            return Ok("Person successfully added.");
        }

        [HttpGet("{personId}/joined-courses")]
        [ProducesResponseType(typeof(PaginatedResponse<DiplayCourseDTO>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult> GetJoinedCoursesPaged(Guid personId, int pageParam = 1, int pageSize = 1)
        {
            var courses = await _courseRepository.GetJoinedCoursesPaginated(personId, pageParam, pageSize);
            if (courses == null)
                return NotFound($"Could not find person {personId}");

            return Ok(courses);
        }
    }
}
