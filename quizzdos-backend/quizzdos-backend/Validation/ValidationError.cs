namespace quizzdos_backend.Validation
{
    public class ValidationError
    {
        public bool Error { get; set; } = true;
        public string Message { get; }

        public ValidationError(string message)
        {
            Message = message;
        }
    }
}