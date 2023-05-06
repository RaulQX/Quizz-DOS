using quizzdos_EFCore.Entities.BaseEntities;
using quizzdos_EFCore.Entities.Courses;
using quizzdos_EFCore.Entities.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace quizzdos_EFCore.Relations.ManyToMany
{
    [Table("Grades")]
    public class Grade : BaseEntity
    {
        [Required]
        public Guid PersonId { get; set; }
        [ForeignKey("PersonId")]
        public Person Person { get; set; } = null!;

        [Required]
        public Guid QuizId { get; set; }
        [ForeignKey("QuizzId")]
        public Quiz Quiz { get; set; } = null!;

        [Required]
        public double GradeValue { get; set; }
    }
}
