namespace quizzdos_backend.Validation
{
    public class UsernameValidationResponse
    {
        public ValidationError UsernameEmpty { get; set; } = new("Username is empty");
        public ValidationError UsernameTooShort { get; set; } = new("Username is too short");
        public ValidationError UsernameTooLong { get; set; } = new("Username is too long");
        public ValidationError UsernameFormat { get; set; } = new("Username is not valid");
    }
}