using Microsoft.EntityFrameworkCore;
using quizzdos_backend.DTOs;
using quizzdos_backend.Paging;
using quizzdos_EFCore;
using quizzdos_EFCore.Entities.Courses;
using quizzdos_EFCore.Entities.Users;
using quizzdos_EFCore.Relations.ManyToMany;

namespace quizzdos_backend.Repositories
{
    public interface ICourseRepository
    {
        public Task<Course?> AddCourseAsync(CourseDTO addingCourse);
        public Task<Course?> DeleteCourseAsync(Guid courseId);
        public Task<Course?> UpdateCourseAsync(Guid courseId, CourseDTO updatedCourse);
        public Task<PaginatedResponse<Course>> GetCreatedCoursesPaged(Guid creatorId, int page, int pageSize);
        public Task<bool> AddPersonToCourse(string code, Guid personId);
        public Task<PaginatedResponse<Course>?> GetJoinedCoursesPaginated(Guid personId, int page, int pageSize);
    }
    public class CourseRepository : ICourseRepository
    {
        private readonly Context _context;
        public CourseRepository(Context context)
        {
            _context = context;
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
                Code = Guid.NewGuid().ToString("N")[8..]
            };

            creator.Courses.Add(newCourse);

            await _context.Courses.AddAsync(newCourse);
            await _context.SaveChangesAsync();
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
            return course;
        }

        public async Task<Course?> FindCourseByIdAsync(Guid courseId)
        {
            return await _context.Courses.FindAsync(courseId);
        }

        public async Task<PaginatedResponse<Course>> GetCreatedCoursesPaged(Guid creatorId, int page, int pageSize)
        {
            page = (page < 1) ? 1 : page; 
            pageSize = (pageSize < 1) ? 1 : pageSize;

            var courses = await _context.Courses.Where(c => c.CreatorId == creatorId).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            var totalCourses = await _context.Courses.Where(c => c.CreatorId == creatorId).CountAsync();

            return new PaginatedResponse<Course>(page, pageSize, totalCourses, courses);
        }

        public async Task<bool> AddPersonToCourse(string code, Guid personId)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(c => c.Code == code);
            var person = await _context.People.FindAsync(personId);
           
            if (course == null || person == null)
                return false;

            var courseAppartenence = new CourseAppartenence
            {
                CourseId = course.Id,
                PersonId = person.Id,
            };

            await _context.CourseAppartenences.AddAsync(courseAppartenence);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<PaginatedResponse<Course>?> GetJoinedCoursesPaginated(Guid personId, int page, int pageSize)
        {
            var person = await _context.People
               .Include(p => p.CourseAppartenences)
               .ThenInclude(ca => ca.Course)
               .FirstOrDefaultAsync(p => p.Id == personId);

            if (person == null)
                return null;

            var joinedCourses = person.CourseAppartenences
                .Select(ca => ca.Course)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalJoinedCourses = person.CourseAppartenences.Count;

            return new PaginatedResponse<Course>(page, pageSize, totalJoinedCourses, joinedCourses);
        }
    }
}
