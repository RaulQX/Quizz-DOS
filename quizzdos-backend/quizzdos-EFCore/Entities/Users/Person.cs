﻿using Microsoft.EntityFrameworkCore.Metadata.Internal;
using quizzdos_EFCore.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using quizzdos_EFCore.Entities.BaseEntities;
using quizzdos_EFCore.Entities.Courses;
using quizzdos_EFCore.Entities.Notifications;
using quizzdos_EFCore.Relations.ManyToMany;

namespace quizzdos_EFCore.Entities.Users
{
    [Table("People")]
    public class Person : BaseEntity
    {
        public Person()
        {
            Courses = new HashSet<Course>();
            Notifications = new HashSet<Notification>();
            CourseAppartenences = new HashSet<CourseMembership>();
            Grades = new HashSet<Grade>();
        }
        public Person(User user) : this()
        {
            this.UserId = user.Id;
        }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string FirstName { get; set; } = String.Empty;
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string LastName { get; set; } = String.Empty;
        public string FullName => $"{FirstName} {LastName}";
        [Required]
        public ERole Role { get; set; } = ERole.Student;
        public EGender Gender { get; set; } = EGender.NotSpecified;
        public ICollection<CourseMembership> CourseAppartenences { get; set; }
        public ICollection<Course> Courses { get; set; }
        public ICollection<Notification> Notifications { get; set; }
        public ICollection<Grade> Grades { get; set; }


        [Required]
        public Guid UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
    }
}
