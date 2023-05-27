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

    public class DiplayCourseDTO
    {
        public Guid Id { get; set; }
        public string ShortName { get; set; } = string.Empty;
        public int SectionsNumber { get; set; }
        public double Progress { get; set; }
        public string? Icon { get; set; } = string.Empty;
        public string? Code { get; set; } = string.Empty;
    }
    public class AccessedCourseDTO
    {
        public string Name { get; set; } = string.Empty;
        public string ShortName { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string? MaterialsUrl { get; set; } = string.Empty;
        public List<AccessedSectionsDTO> Sections { get; set; } = new List<AccessedSectionsDTO>();
    }
}
