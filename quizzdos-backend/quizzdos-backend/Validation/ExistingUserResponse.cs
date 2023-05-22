namespace quizzdos_backend.Validation
{
    public class ExistingUserResponse
    {
        public ValidationError UsernameAlreadyExists { get; set; } = new("Username already exists");
        public ValidationError EmailAlreadyExists { get; set; } = new("Email already in use");
        public ValidationError PhoneNumberAlreadyExists { get; set; } = new("Phone number already in use");
    }
}
