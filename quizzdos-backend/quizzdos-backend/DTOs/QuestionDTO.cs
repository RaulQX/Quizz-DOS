namespace quizzdos_backend.DTOs
{
    public class QuestionDTO
    {
        public Guid Id { get; set; }
        public string Prompt { get; set; } = string.Empty;
        public double QuestionScore { get; set; }
        public bool TipAllowed { get; set; } = false;
        public List<OptionDTO> Options { get; set; } = new List<OptionDTO>();
    }

    public class QuizQuestionDTO
    {
        public Guid Id { get; set; }
        public string Prompt { get; set; } = string.Empty;
        public double QuestionScore { get; set; }
        public bool TipAllowed { get; set; }
        public List<QuestionOptionDTO> Options { get; set;  } = new List<QuestionOptionDTO>();
    }

    public class QuestionWithAnswersDTO
    {
        public List<Guid> ChosenOptions { get; set; } = new List<Guid>();
        public Guid Id { get; set; }
        public List<OptionDTO> Options { get; set; } = new List<OptionDTO>();
        public double QuestionScore { get; set; }
    }

}
