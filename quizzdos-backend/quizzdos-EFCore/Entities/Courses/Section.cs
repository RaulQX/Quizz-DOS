using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using quizzdos_EFCore.Entities.BaseEntities;

namespace quizzdos_EFCore.Entities.Courses
{
    [Table("Sections")]
    public class Section : BaseEntity
    {
        [Required]
        public Guid CourseId { get; set; }
        [ForeignKey("CourseId")]
        public Course Course { get; set; } = null!;

        [Required]
        public uint Index { get; set; }

        [Required]
        [MaxLength(50)]
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        [Column(TypeName = "nvarchar(50)")]
        public string Summary { get; set; } = string.Empty;

        public ICollection<Quiz> Quizzes { get; set; } = new HashSet<Quiz>();
    }
}
