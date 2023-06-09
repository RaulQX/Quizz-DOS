﻿namespace quizzdos_backend.DTOs
{
    public class NotificationDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Text { get; set; } = String.Empty;
        public string DateReceived { get; set; } = string.Empty;
        public bool Read { get; set; } = false;
    }
}
