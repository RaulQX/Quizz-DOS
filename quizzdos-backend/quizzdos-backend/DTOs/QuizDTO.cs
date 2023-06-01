using quizzdos_EFCore.Enums;

namespace quizzdos_backend.DTOs
{
    public class AccessedQuizDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public EQuizStatus Status { get; set; }
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
        public EQuizStatus Status { get; set; }
    }
    public class StartQuizDTO
    {
        public string Title { get; set; } = string.Empty;
        public EQuizStatus Status { get; set; }
        public string SectionName { get; set; } = string.Empty;
        public uint QuestionsNumber { get; set; }
        public double Grade { get; set; }
        public List<QuestionDTO> Questions { get; set; } = new List<QuestionDTO>();
    }

    public class QuizWithAnswersDTO
    {
        public Guid QuizId { get; set; }
        public List<QuestionWithAnswersDTO> Questions { get; set; } = new List<QuestionWithAnswersDTO>();
    }

    public class QuizResultDTO
    {
        public double QuizGrade { get; set; }
        public uint CorrectQuestions { get; set; }
        public uint TotalQuestions { get; set; }
    }

}
