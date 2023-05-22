namespace quizzdos_backend.Validation
{
    public class EmailValidationResponse
    {
        public ValidationError EmailEmpty { get; set; } = new("Email is empty");
        public ValidationError EmailTooShort { get; set; } = new("Email is too short");
        public ValidationError EmailTooLong { get; set; } = new("Email is too long");
        public ValidationError EmailFormat { get; set; } = new("Email is not valid");
    }
}
