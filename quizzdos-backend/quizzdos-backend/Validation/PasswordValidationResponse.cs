namespace quizzdos_backend.Validation
{
    public class PasswordValidationResponse
    {
        public ValidationError PasswordEmpty { get; set; } = new("Password is empty");
        public ValidationError PasswordTooShort { get; set; } = new("Password must be at least 8 characters");
        public ValidationError PasswordTooLong { get; set; } = new("Password is too long");
    }
}