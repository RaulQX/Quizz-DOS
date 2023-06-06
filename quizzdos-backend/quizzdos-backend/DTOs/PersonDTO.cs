﻿using quizzdos_EFCore.Enums;

namespace quizzdos_backend.DTOs
{
    public class PersonSettingsDTO
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public ERole Role { get; set; }
        public EGender Gender { get; set; }
    }
}
