namespace quizzdos_backend.DTOs
{
    public class CourseDTO
    {
        public Guid CreatorId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ShortName { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string MaterialsUrl { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
    }
}
