using Microsoft.EntityFrameworkCore.Metadata.Internal;
using quizzdos_EFCore.Entities.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;
using quizzdos_EFCore.Entities.Users;

namespace quizzdos_EFCore.Entities.Courses
{
    [Table("Courses")]
    public class Course : BaseEntity
    {
        public Course() { }

        [Required]
        public Guid CreatorId { get; set; }
        [ForeignKey("CreatorId")]
        public Person Creator { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; } = string.Empty;
        public string ShortName { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        [Column(TypeName = "nvarchar(200)")]
        public string Summary { get; set; } = string.Empty;
        [Required]
        [MaxLength(200)]
        [Column(TypeName = "nvarchar(300)")]
        public string? MaterialsUrl { get; set; }
        public ICollection<Section> Sections { get; set; } = new HashSet<Section>();
        public string? Icon { get; set; } = string.Empty;
        public string? Code { get; set; } = string.Empty;
    }
}
