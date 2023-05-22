namespace quizzdos_backend.Validation
{
    public class ValidationResponse
    {
        public ExistingUserResponse? ExistingUserResponse { get; set; } = new();
        public UsernameValidationResponse? UsernameValidationResponse { get; set; } = new();
        public PhoneNumberValidationResponse? PhoneNumberValidationResponse { get; set; } = new();
        public EmailValidationResponse? EmailValidationResponse { get; set; } = new();
        public PasswordValidationResponse? PasswordValidationResponse { get; set; } = new();
    }
}