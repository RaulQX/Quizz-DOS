using Microsoft.EntityFrameworkCore.Metadata.Internal;
using quizzdos_EFCore.Entities.BaseEntities;
using quizzdos_EFCore.Entities.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace quizzdos_EFCore.Entities.Notifications
{
    [Table("Notifications")]
    public class Notification : BaseEntity
    {
        public Notification(Guid personId, string title, string text)
        {
            this.PersonId = personId;
            this.Title = title;
            this.Text = text;
            this.DateReceived = DateTime.Now;
            this.Read = false;
        }

        [Required]
        public Guid PersonId { get; set; }
        [ForeignKey("PersonId")]
        public Person Person { get; set; } = null!;

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Title { get; set; } = String.Empty;
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Text { get; set; } = String.Empty;
        public DateTime DateReceived { get; set; } = DateTime.Now;
        public bool Read { get; set; } = false;
    }
}
