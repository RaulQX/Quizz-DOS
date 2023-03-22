using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace quizzdos_EFCore.Entities.BaseEntity
{
    public class BaseEntity
    {
        [Key]
        [Required]
        public Guid Id { get; set; } = Guid.NewGuid();
    }
}
