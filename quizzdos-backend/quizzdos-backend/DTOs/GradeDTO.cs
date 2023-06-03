namespace quizzdos_backend.DTOs
{
    public class GradeQuizInput
    {
        public Guid QuizId { get; set; }
        public Guid PersonId { get; set; }
        public double QuizGrade { get; set; }
    }
}
