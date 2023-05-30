using Microsoft.EntityFrameworkCore.Metadata.Internal;
using quizzdos_EFCore.Entities.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace quizzdos_EFCore.Entities.Courses
{
    [Table("Options")]
    public class Option : BaseEntity
    {
        public Guid QuestionId { get; set; }
        public Question Question { get; set; } = null!;
        public double ScorePercentage { get; set; }

        [Required]
        [MaxLength(100)]
        [Column(TypeName = "nvarchar(100)")]
        public string Text { get; set; } = string.Empty;
    }
}
