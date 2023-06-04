using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using quizzdos_backend.DTOs;
using quizzdos_backend.Paging;
using quizzdos_EFCore;
using quizzdos_EFCore.Entities.Courses;
using quizzdos_EFCore.Entities.Users;
using quizzdos_EFCore.Relations.ManyToMany;

namespace quizzdos_backend.Repositories
{
    public interface IStatisticsRepository
    {
        public Task<List<CourseStudentStatisticsDTO>?> GetStudentsCourseStatisticsAsync(Guid personId);
        public Task<PaginatedResponse<CourseProfessorStatisticsDTO>?> GetProfessorsStatisticsAsync(Guid personId, int pageNumber, int pageSize);
    }

    public class StatisticsRepository : IStatisticsRepository
    {
        private readonly Context _context;
        public StatisticsRepository(Context context)
        {
            _context = context;
        }
        public async Task<List<CourseStudentStatisticsDTO>?> GetStudentsCourseStatisticsAsync(Guid personId)
        {
            var student = await FetchStudentWithCourses(personId);

            if (student == null)
                return null;

            var statistics = student.CourseAppartenences
                .Where(ca => ca.Course.Sections.Any())
                .Select(ca => GenerateCourseStatistics(ca, personId))
                .OrderByDescending(cs => cs.Sections.Select(s => s.Average).DefaultIfEmpty(0).Average())
                .ToList();

            return statistics;
        }

        private async Task<Person?> FetchStudentWithCourses(Guid personId)
        {
            return await _context.People
                .Include(p => p.CourseAppartenences)
                .ThenInclude(ca => ca.Course)
                .ThenInclude(c => c.Sections)
                .ThenInclude(s => s.Quizzes)
                .ThenInclude(q => q.Grades)
                .FirstOrDefaultAsync(p => p.Id == personId);
        }

        private CourseStudentStatisticsDTO GenerateCourseStatistics(CourseMembership courseAppartenance, Guid personId)
        {
            return new CourseStudentStatisticsDTO
            {
                Id = courseAppartenance.CourseId.GetValueOrDefault(),
                ShortName = courseAppartenance.Course.ShortName,
                Sections = courseAppartenance.Course.Sections
                    .Where(s => s.Quizzes.Any())
                    .Select(s => GenerateSectionStatistics(s, personId))
                    .OrderByDescending(ss => ss.Average)
                    .ToList()
            };
        }

        private SectionStudentStatisticsDTO GenerateSectionStatistics(Section section, Guid personId)
        {
            return new SectionStudentStatisticsDTO
            {
                Id = section.Id,
                Name = section.Name,
                Average = section.Quizzes
                    .Select(q => q.Grades
                        .Where(g => g.PersonId == personId)
                        .OrderByDescending(g => g.GradeValue)
                        .FirstOrDefault()?.GradeValue ?? 0)
                    .DefaultIfEmpty(0)
                    .Average(),
                Quizzes = section.Quizzes
                    .Select(q => GenerateQuizStatistics(q, personId))
                    .OrderByDescending(qs => qs.Grade)
                    .ToList()
            };
        }

        private QuizStudentStatisticsDTO GenerateQuizStatistics(Quiz quiz, Guid personId)
        {
            return new QuizStudentStatisticsDTO
            {
                Id = quiz.Id,
                Name = quiz.Name,
                Grade = quiz.Grades
                    .Where(g => g.PersonId == personId)
                    .OrderByDescending(g => g.GradeValue)
                    .FirstOrDefault()?.GradeValue ?? 0
            };
        }

        public async Task<PaginatedResponse<CourseProfessorStatisticsDTO>?> GetProfessorsStatisticsAsync(Guid personId, int pageNumber, int pageSize)
        {
            if (pageNumber < 1)
                pageNumber = 1;
            if (pageSize < 1)
                pageSize = 1;

            var professorCourses = await FetchProfessorCourses(personId);

            var statistics = professorCourses
                .Select(c => GenerateStatistics(c))
                .OrderByDescending(c => c.StudentsNumber)
                .ThenByDescending(c => c.AverageGrade)
                .Skip(pageNumber - 1).Take(pageSize).ToList();

            return new PaginatedResponse<CourseProfessorStatisticsDTO>
            (
                pageNumber,
                pageSize,
                professorCourses.Count,
                statistics
            );
        }

        private async Task<List<Course>> FetchProfessorCourses(Guid personId)
        {
            return await _context.Courses
                .Include(c => c.CourseAppartenences)
                .Include(c => c.Sections)
                    .ThenInclude(s => s.Quizzes)
                    .ThenInclude(q => q.Grades)
                .Where(c => c.CreatorId == personId)
                .ToListAsync();
        }

        private CourseProfessorStatisticsDTO GenerateStatistics(Course course)
        {
            return new CourseProfessorStatisticsDTO
            {
                Id = course.Id,
                ShortName = course.ShortName,
                AverageGrade = course.Sections
                    .SelectMany(s => s.Quizzes)
                    .SelectMany(q => q.Grades)
                    .DefaultIfEmpty()
                    .Average(g => g?.GradeValue ?? 0),
                StudentsNumber = course.CourseAppartenences.Count,
            };
        }
    }
}
