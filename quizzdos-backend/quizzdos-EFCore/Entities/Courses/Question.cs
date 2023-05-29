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
    [Table("Questions")]
    public class Question : BaseEntity
    {
        [Required]
        public Guid QuizId { get; set; }
        [ForeignKey("QuizzId")]
        public Quiz Quiz { get; set; } = null!;

        [Required]
        [MaxLength(200)]
        [Column(TypeName = "nvarchar(200)")]
        public string Prompt { get; set; } = string.Empty;

        [Required]
        public int QuestionScore { get; set; }

        [Required]
        public bool TipAllowed { get; set; } = false;
        public ICollection<Option> Options { get; set; } = new HashSet<Option>();
    }
}
