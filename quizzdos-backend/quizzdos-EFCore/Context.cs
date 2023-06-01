using Microsoft.EntityFrameworkCore;
using quizzdos_EFCore.Entities.Courses;
using quizzdos_EFCore.Entities.Notifications;
using quizzdos_EFCore.Entities.Users;
using quizzdos_EFCore.Relations.ManyToMany;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace quizzdos_EFCore
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Person> People { get; set; } = null!;
        public DbSet<CourseMembership> CourseAppartenences { get; set; } = null!;
        public DbSet<Option> Options { get; set; } = null!;
        public DbSet<Course> Courses { get; set; } = null!;
        public DbSet<Section> Sections { get; set; } = null!;
        public DbSet<Question> Questions { get; set; } = null!;
        public DbSet<Quiz> Quizzes { get; set; } = null!;
        public DbSet<Notification> Notifications { get; set; } = null!;
        public DbSet<Grade> Grades { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Option>()
                .HasOne(o => o.Question)
                .WithMany(q => q.Options)
                .HasForeignKey(o => o.QuestionId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Options_Questions_QuestionId_FK1");


            modelBuilder.Entity<CourseMembership>()
                .HasOne(ca => ca.Person)
                .WithMany(p => p.CourseAppartenences)
                .HasForeignKey(ca => ca.PersonId)
                .OnDelete(DeleteBehavior.NoAction)
                .HasConstraintName("FK_CourseAppartenences_People_PersonId")
                .IsRequired();

            modelBuilder.Entity<CourseMembership>()
                .HasOne(ca => ca.Course)
                .WithMany(c => c.CourseAppartenences)
                .HasForeignKey(ca => ca.CourseId)
                .OnDelete(DeleteBehavior.NoAction)
                .HasConstraintName("FK_CourseAppartenences_Courses_CourseId")
                .IsRequired();

            modelBuilder.Entity<Grade>()
               .HasOne(g => g.Person)
               .WithMany(p => p.Grades)
               .HasForeignKey(g => g.PersonId)
               .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Grade>()
                .HasOne(g => g.Quiz)
                .WithMany(q => q.Grades)
                .HasForeignKey(g => g.QuizId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Course>()
                .HasOne(p => p.Creator)
                .WithMany(p => p.Courses)
                .HasForeignKey(p => p.CreatorId);
        }

    }
}
