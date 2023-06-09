using Microsoft.EntityFrameworkCore;
using quizzdos_backend.DTOs;
using quizzdos_backend.Paging;
using quizzdos_EFCore;
using quizzdos_EFCore.Entities.Courses;
using quizzdos_EFCore.Entities.Users;
using quizzdos_EFCore.Enums;
using quizzdos_EFCore.Relations.ManyToMany;

namespace quizzdos_backend.Repositories
{
    public interface ICourseRepository
    {
        public Task<Course?> AddCourseAsync(CourseDTO addingCourse);
        public Task<Course?> DeleteCourseAsync(Guid courseId);
        public Task<Course?> UpdateCourseAsync(Guid courseId, CourseDTO updatedCourse);
        public Task<AccessedCourseDTO?> GetCourseByIdAsync(Guid courseId, Guid personId);
        public Task<PaginatedResponse<DiplayCourseDTO>> GetCreatedCoursesPaged(Guid creatorId, int page, int pageSize);
        public Task<bool> AddPersonToCourse(string code, Guid personId);
        public Task<PaginatedResponse<DiplayCourseDTO>?> GetJoinedCoursesPaginated(Guid personId, int page, int pageSize);
    }
    public class CourseRepository : ICourseRepository
    {
        private readonly Context _context;
        private readonly INotificationRepository _notificationRepository;
        public CourseRepository(Context context)
        {
            _context = context;
            _notificationRepository = new NotificationRepository(context);
        }

        public async Task<Course?> AddCourseAsync(CourseDTO addingCourse)
        {
            var creator = await _context.People.FindAsync(addingCourse.CreatorId);
            if (creator == null)
                return null;

            var newCourse = new Course
            {
                CreatorId = addingCourse.CreatorId,
                Creator = creator,
                Name = addingCourse.Name,
                ShortName = addingCourse.ShortName,
                Summary = addingCourse.Summary,
                MaterialsUrl = addingCourse.MaterialsUrl,
                Icon = addingCourse.Icon,
                Code = Guid.NewGuid().ToString("N")[..8]
            };

            creator.Courses.Add(newCourse);

            await _context.Courses.AddAsync(newCourse);
            await _context.SaveChangesAsync();

            await _notificationRepository
                .AddNotification(
                title: "Course created successfully",
                text: $"Course {newCourse.Name} was created successfully",
                personId: creator.Id);

            return newCourse;
        }

       

        public async Task<Course?> DeleteCourseAsync(Guid courseId)
        {
            var course = await FindCourseByIdAsync(courseId);
            if (course == null)
                return null;

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return course;
        }

        public async Task<Course?> UpdateCourseAsync(Guid courseId, CourseDTO updatedCourse)
        {
            var course = await FindCourseByIdAsync(courseId);
            if (course == null)
                return null;

            course.Name = updatedCourse.Name;
            course.ShortName = updatedCourse.ShortName;
            course.Summary = updatedCourse.Summary;
            course.MaterialsUrl = updatedCourse.MaterialsUrl;
            course.Icon = updatedCourse.Icon;

            await _context.SaveChangesAsync();

            await _notificationRepository.AddNotification(
                  title: "Course updated successfully",
                  text: $"Course '{course.Name}''s details were added successfully!",
                  personId: course.CreatorId);


            return course;
        }

        public async Task<Course?> FindCourseByIdAsync(Guid courseId)
        {
            return await _context.Courses.FindAsync(courseId);
        }

        public async Task<PaginatedResponse<DiplayCourseDTO>> GetCreatedCoursesPaged(Guid creatorId, int page, int pageSize)
        {
            page = (page < 1) ? 1 : page; 
            pageSize = (pageSize < 1) ? 1 : pageSize;

            var courses = await _context.Courses.Include(c => c.Sections).Where(c => c.CreatorId == creatorId).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            var coursesDTO = courses.Select(c => new DiplayCourseDTO
            {
                ShortName = c.ShortName,
                Icon = c.Icon,
                Code = c.Code,
                Id = c.Id,
                SectionsNumber = c.Sections.Count,
                Progress = 0
            }).ToList();
            var totalCourses = await _context.Courses.Where(c => c.CreatorId == creatorId).CountAsync();

            return new PaginatedResponse<DiplayCourseDTO>(page, pageSize, totalCourses, coursesDTO);
        }

        public async Task<bool> AddPersonToCourse(string code, Guid personId)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(c => c.Code == code);
            var person = await _context.People.FindAsync(personId);
           
            if (course == null || person == null)
                return false;

            var courseAppartenence = new CourseMembership
            {
                CourseId = course.Id,
                PersonId = person.Id,
            };

            bool hasPersonJoinedCourse = await _context.CourseAppartenences
                .Include(ca => ca.Course)
                .AnyAsync(ca => ca.Course.Code == code);

            if (hasPersonJoinedCourse)
                return false;

            await _context.CourseAppartenences.AddAsync(courseAppartenence);
            await _context.SaveChangesAsync();

            await _notificationRepository.AddNotification(
                  title: "Course joined successfully",
                  text: $"You have joined course '{course.Name}' successfully!",
                  personId: person.Id);

            return true;
        }

        public async Task<PaginatedResponse<DiplayCourseDTO>?> GetJoinedCoursesPaginated(Guid personId, int page, int pageSize)
        {
            var person = await _context.People
               .Include(p => p.CourseAppartenences)
               .ThenInclude(ca => ca.Course)
               .ThenInclude(c => c.Sections)
               .ThenInclude(s => s.Quizzes)
               .ThenInclude(q => q.Grades)
               .FirstOrDefaultAsync(p => p.Id == personId);

            if (person == null)
                return null;

            var joinedCourses = person.CourseAppartenences
                 .Select(ca => new DiplayCourseDTO
                 {
                     Id = ca.CourseId.GetValueOrDefault(),
                     ShortName = ca.Course.ShortName,
                     SectionsNumber = ca.Course.Sections.Count,
                     Progress = GetSectionProgress(ca.Course, personId),
                     Icon = ca.Course.Icon,
                     Code = ca.Course.Code
                 })
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalJoinedCourses = person.CourseAppartenences.Count;

            return new PaginatedResponse<DiplayCourseDTO>(page, pageSize, totalJoinedCourses, joinedCourses);
        }
        private static double GetSectionProgress(Course course, Guid personId)
        {

            double totalSections = course.Sections.Count;
            double completedSections = course.Sections
                .Where(section => section.Quizzes.All(quiz => GetQuizStatus(quiz, personId) == EQuizStatus.Done))
                .Count();

            return totalSections == 0 ? 0 : completedSections / totalSections;
        }

        public async Task<AccessedCourseDTO?> GetCourseByIdAsync(Guid courseId, Guid personId)
        {
            var course = await _context.Courses
                .Include(c => c.Sections)
                .ThenInclude(s => s.Quizzes)
                .ThenInclude(q => q.Grades)
                .FirstOrDefaultAsync(c => c.Id == courseId);


            if (course == null)
                return null;

            var sections = course.Sections;

            var accessedCourse = new AccessedCourseDTO
            {
                MaterialsUrl = course.MaterialsUrl,
                Name = course.Name,
                ShortName = course.ShortName,
                Summary = course.Summary,
                Sections = course.Sections.Select(s => new AccessedSectionsDTO
                {
                    Id = s.Id,
                    Name = s.Name,
                    Summary = s.Summary,
                    Progress = CalculateSectionProgress(s.Quizzes.ToList()),
                    Quizzes = s.Quizzes.Select(q => new AccessedQuizDTO
                    {
                        Id = q.Id,
                        Name = q.Name,
                        Status = GetQuizStatus(q, personId)
                    }).ToList()
                }).ToList()
            };

            return accessedCourse;
        }

        private static double CalculateSectionProgress(List<Quiz> quizzes)
        {
            double totalQuizzes = quizzes.Count;
            double completedQuizzes = quizzes.Count(q => q.Status == EQuizStatus.Done);
            return totalQuizzes == 0 ? 0 : completedQuizzes / totalQuizzes;
        }

        private static EQuizStatus GetQuizStatus(Quiz q, Guid personId)
        {

            Grade? maxGrade = q.Grades.Where(g => g.PersonId == personId).OrderByDescending(g => g.GradeValue).FirstOrDefault();
            return maxGrade switch
            {
                null => EQuizStatus.Unopened,
                Grade g when g.GradeValue == 10 => EQuizStatus.Done,
                _ => EQuizStatus.InProgress,
            };
        }
    }
}
