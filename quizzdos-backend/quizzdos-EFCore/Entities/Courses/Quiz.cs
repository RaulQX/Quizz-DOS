using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using quizzdos_EFCore.Enums;
using quizzdos_EFCore.Entities.BaseEntities;

namespace quizzdos_EFCore.Entities.Courses
{
    [Table("Quizzes")]
    public class Quiz : BaseEntity
    {
        [Required]
        public Guid SectionId { get; set; }
        [ForeignKey("SectionId")]
        public Section Section { get; set; } = null!;

        [Required]
        public uint Index { get; set; }

        [Required]
        [MaxLength(50)]
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; } = string.Empty;

        [Required]
        public QuizStatus Status { get; set; }

        public ICollection<Question> Questions { get; set; } = new HashSet<Question>();
        public ushort Grade { get; set; }

    }
}
