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
using System.Text.Json.Serialization;

namespace quizzdos_EFCore.Relations.ManyToMany
{
    public class CourseMembership : BaseEntity
    {
     
        public Guid? PersonId { get; set; }

        [ForeignKey("PersonId")]
        [JsonIgnore]

        public Person Person { get; set; } = null!;

        public Guid? CourseId { get; set; }
        [ForeignKey("CourseId")]
        [JsonIgnore]

        public Course Course { get; set; } = null!;
    }
}
