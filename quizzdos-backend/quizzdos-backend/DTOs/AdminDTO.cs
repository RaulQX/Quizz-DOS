using quizzdos_EFCore.Enums;

namespace quizzdos_backend.DTOs
{
    public class AdminDashboardDTO
    {
        public int TotalUsers { get; set; }
        public int TotalProfessors { get; set; }
        public int TotalStudents { get; set; }
        public int TotalAdmins { get; set; }
        public int TotalCourses { get; set; }  
        public int TotalQuizzes { get; set; }
        public string CreatedMostCourses { get; set; } = string.Empty;
        public string MostQuizzesSolved { get; set; } = string.Empty;
    }

    public class PeopleDTO
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public ERole Role { get; set; }
        public Boolean FirstEntry { get; set; } = false;
        public Boolean LastEntry { get; set; } = false;
    }
}
