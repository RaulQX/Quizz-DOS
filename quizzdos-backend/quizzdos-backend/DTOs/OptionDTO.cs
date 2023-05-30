namespace quizzdos_backend.DTOs
{
    public class OptionDTO
    {
        public Guid Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public double ScorePercentage { get; set; } 
    }

    public class QuestionOptionDTO
    {
        public string Text { get; set; } = string.Empty;
        public double ScorePercentage { get; set; }

    }
}
