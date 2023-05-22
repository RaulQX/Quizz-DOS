namespace quizzdos_backend.Validation
{
    public class PhoneNumberValidationResponse
    {
        public ValidationError PhoneNumberEmpty { get; set; } = new("Phone number is empty");
        public ValidationError PhoneNumberLength { get; set; } = new("Phone number must be exactly 10 digits");
        public ValidationError PhoneNumberFormat { get; set; } = new("Phone number is not valid");
    }
}

