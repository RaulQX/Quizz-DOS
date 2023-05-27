namespace quizzdos_backend.DTOs
{
    public class SectionDTO
    {
        public Guid CourseId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
    }
    public class AccessedSectionsDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public double Progress { get; set; }
        public List<AccessedQuizDTO> Quizzes { get; set; } = new List<AccessedQuizDTO>();
    }
}
