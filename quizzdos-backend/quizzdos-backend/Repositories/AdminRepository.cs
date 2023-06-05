using Microsoft.EntityFrameworkCore;
using quizzdos_backend.DTOs;
using quizzdos_backend.Paging;
using quizzdos_EFCore;
using quizzdos_EFCore.Entities.Users;
using quizzdos_EFCore.Enums;
using System.Linq.Expressions;

namespace quizzdos_backend.Repositories
{
    public interface IAdminRepository
    {
        public Task<AdminDashboardDTO> GetAdminDashboard();
        public Task<PaginatedResponse<PeopleDTO>?> GetPeoplePaged(string name, int pageParam, int pageSize);
        public Task<Person?> UpdatePersonRoleByIdAsync(Guid personId, ERole role);
    }
    public class AdminRepository : IAdminRepository
    {
        private readonly Context _context;
        public AdminRepository(Context context)
        {
            _context = context;
        }

        public async Task<AdminDashboardDTO> GetAdminDashboard()
        {
            var totalUsers = await _context.Users.CountAsync();
            var totalProfessors = await _context.People.Where(p => p.Role == ERole.Professor).CountAsync();
            var totalStudents = await _context.People.Where(p => p.Role == ERole.Student).CountAsync();
            var totalAdmins = await _context.People.Where(p => p.Role == ERole.Admin).CountAsync();

            var totalCourses = await _context.Courses.CountAsync();
            var totalQuizzes = await _context.Quizzes.CountAsync();


            var mostCoursesCreated =
                await _context.People
                .Include(p => p.Courses)
                .Where(p => p.Role == ERole.Professor)
                .OrderByDescending(p => p.Courses.Count)
                .FirstOrDefaultAsync();
            var mostCreatedName = mostCoursesCreated is null ? "None" : mostCoursesCreated.FullName;

            var mostQuizzesSolved = 
                await _context.People
                .Include(p => p.Grades)
                .Where(p => p.Role == ERole.Student)
                .OrderByDescending(p => p.Grades.Count)
                .FirstOrDefaultAsync();

            var mostQuizzesSolvedName = mostQuizzesSolved is null ? "None" : mostQuizzesSolved.FullName;

            return new AdminDashboardDTO()
            {
                TotalUsers = totalUsers,
                TotalProfessors = totalProfessors,
                TotalStudents = totalStudents,
                TotalAdmins = totalAdmins,
                TotalCourses = totalCourses,
                TotalQuizzes = totalQuizzes,
                CreatedMostCourses = mostCreatedName,
                MostQuizzesSolved = mostQuizzesSolvedName
            };
        }

        public async Task<PaginatedResponse<PeopleDTO>?> GetPeoplePaged(string name, int pageParam, int pageSize)
        {
            var lowerName = name.ToLower();

            var people = 
                await _context.People
                .Where(p => p.FirstName != string.Empty && (p.FirstName.ToLower().Contains(lowerName) || p.LastName.ToLower().Contains(lowerName)))
                .OrderBy(p => p.FirstName)
                .Skip((pageParam - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new PeopleDTO()
                {
                    Id = p.Id,
                    FullName = p.FullName,
                    Role = p.Role,
                })
                .ToListAsync();
            var totalEligiblePeople = await _context.People.Where(p => p.FirstName != string.Empty && (p.FirstName.ToLower().Contains(lowerName) || p.LastName.ToLower().Contains(lowerName))).CountAsync();
            if (people is null)
                return null;

            if (people.Count > 0)
            {
                people[0].FirstEntry = true;
                people[^1].LastEntry = true;
            }


            return new PaginatedResponse<PeopleDTO>(pageParam, pageSize, totalEligiblePeople, people);

        }
        public async Task<Person?> UpdatePersonRoleByIdAsync(Guid personId, ERole role)
        {
            var person = await _context.People.FindAsync(personId);

            if (person == null)
            {
                return null;
            }

            person.Role = role;
            await _context.SaveChangesAsync();
            return person;
        }
    }
}
