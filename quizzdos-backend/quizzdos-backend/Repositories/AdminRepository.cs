using Microsoft.EntityFrameworkCore;
using quizzdos_backend.DTOs;
using quizzdos_EFCore;
using quizzdos_EFCore.Enums;

namespace quizzdos_backend.Repositories
{
    public interface IAdminRepository
    {
        public Task<AdminDashboardDTO> GetAdminDashboard();
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
    }
}
