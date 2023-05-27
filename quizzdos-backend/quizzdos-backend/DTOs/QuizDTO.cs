using quizzdos_EFCore.Enums;

namespace quizzdos_backend.DTOs
{
    public class AccessedQuizDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public QuizStatus Status { get; set; }
    }

    public class QuizDTO
    {
        public Guid SectionId { get; set; }
        public string Name { get; set; } = string.Empty;
    }
    public class UpdateQuizDTO
    {
        public Guid SectionId { get; set; }
        public string Name { get; set; } = string.Empty;
        public QuizStatus Status { get; set; }
    }
}
