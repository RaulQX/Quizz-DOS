using quizzdos_EFCore.Entities.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace quizzdos_EFCore.Entities.Courses
{
    public class CorrectAnswers : BaseEntity
    {
        [Required]
        public Guid QuestionId { get; set; }
        [ForeignKey(nameof(QuestionId))]
        public Question Question { get; set; } = null!;
        [Required]
        public Guid OptionId { get; set; }
        [ForeignKey(nameof(OptionId))]
        public Option Option { get; set; } = null!;

    }
}
