namespace quizzdos_backend.DTOs
{
    public class CourseStudentStatisticsDTO
    {
        public Guid Id { get; set; }
        public string ShortName { get; set; } = string.Empty;
        public List<SectionStudentStatisticsDTO> Sections { get; set; } = new List<SectionStudentStatisticsDTO>();
    }
    public class SectionStudentStatisticsDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public double Average { get; set; }
        public List<QuizStudentStatisticsDTO> Quizzes { get; set; } = new List<QuizStudentStatisticsDTO>();
    }
    public class QuizStudentStatisticsDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public double Grade { get; set; }
    }

    public class CourseProfessorStatisticsDTO
    {
        public Guid Id { get; set; }
        public string ShortName { get; set; } = string.Empty;
        public double AverageGrade { get; set; }
        public int StudentsNumber { get; set; }
    }
}
