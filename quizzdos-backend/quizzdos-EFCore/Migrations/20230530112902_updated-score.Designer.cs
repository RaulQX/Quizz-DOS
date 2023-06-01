﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using quizzdos_EFCore;

#nullable disable

namespace quizzdos_EFCore.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20230530112902_updated-score")]
    partial class updatedscore
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Course", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("CreatorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Icon")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MaterialsUrl")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(300)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("ShortName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Summary")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("Id");

                    b.HasIndex("CreatorId");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Option", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("QuestionId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("ScorePercentage")
                        .HasColumnType("float");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("Options");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Question", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Prompt")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<double>("QuestionScore")
                        .HasColumnType("float");

                    b.Property<Guid>("QuizId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("QuizzId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("TipAllowed")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("QuizzId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Quiz", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<Guid>("SectionId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SectionId");

                    b.ToTable("Quizzes");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Section", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CourseId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Summary")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.ToTable("Sections");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Notifications.Notification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DateReceived")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("PersonId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Read")
                        .HasColumnType("bit");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Users.Person", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("Gender")
                        .HasColumnType("int");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("People");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Users.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users", "dbo");
                });

            modelBuilder.Entity("quizzdos_EFCore.Relations.ManyToMany.CourseAppartenence", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CourseId")
                        .IsRequired()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("PersonId")
                        .IsRequired()
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("PersonId");

                    b.ToTable("CourseAppartenences");
                });

            modelBuilder.Entity("quizzdos_EFCore.Relations.ManyToMany.Grade", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("GradeValue")
                        .HasColumnType("float");

                    b.Property<Guid?>("PersonId")
                        .IsRequired()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("QuizId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("QuizzId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.HasIndex("QuizId");

                    b.ToTable("Grades");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Course", b =>
                {
                    b.HasOne("quizzdos_EFCore.Entities.Users.Person", "Creator")
                        .WithMany("Courses")
                        .HasForeignKey("CreatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Creator");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Option", b =>
                {
                    b.HasOne("quizzdos_EFCore.Entities.Courses.Question", "Question")
                        .WithMany("Options")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Options_Questions_QuestionId_FK1");

                    b.Navigation("Question");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Question", b =>
                {
                    b.HasOne("quizzdos_EFCore.Entities.Courses.Quiz", "Quiz")
                        .WithMany("Questions")
                        .HasForeignKey("QuizzId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Quiz");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Quiz", b =>
                {
                    b.HasOne("quizzdos_EFCore.Entities.Courses.Section", "Section")
                        .WithMany("Quizzes")
                        .HasForeignKey("SectionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Section");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Section", b =>
                {
                    b.HasOne("quizzdos_EFCore.Entities.Courses.Course", "Course")
                        .WithMany("Sections")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Notifications.Notification", b =>
                {
                    b.HasOne("quizzdos_EFCore.Entities.Users.Person", "Person")
                        .WithMany("Notifications")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Person");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Users.Person", b =>
                {
                    b.HasOne("quizzdos_EFCore.Entities.Users.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("quizzdos_EFCore.Relations.ManyToMany.CourseAppartenence", b =>
                {
                    b.HasOne("quizzdos_EFCore.Entities.Courses.Course", "Course")
                        .WithMany("CourseAppartenences")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired()
                        .HasConstraintName("FK_CourseAppartenences_Courses_CourseId");

                    b.HasOne("quizzdos_EFCore.Entities.Users.Person", "Person")
                        .WithMany("CourseAppartenences")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired()
                        .HasConstraintName("FK_CourseAppartenences_People_PersonId");

                    b.Navigation("Course");

                    b.Navigation("Person");
                });

            modelBuilder.Entity("quizzdos_EFCore.Relations.ManyToMany.Grade", b =>
                {
                    b.HasOne("quizzdos_EFCore.Entities.Users.Person", "Person")
                        .WithMany("Grades")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("quizzdos_EFCore.Entities.Courses.Quiz", "Quiz")
                        .WithMany("Grades")
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Person");

                    b.Navigation("Quiz");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Course", b =>
                {
                    b.Navigation("CourseAppartenences");

                    b.Navigation("Sections");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Question", b =>
                {
                    b.Navigation("Options");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Quiz", b =>
                {
                    b.Navigation("Grades");

                    b.Navigation("Questions");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Courses.Section", b =>
                {
                    b.Navigation("Quizzes");
                });

            modelBuilder.Entity("quizzdos_EFCore.Entities.Users.Person", b =>
                {
                    b.Navigation("CourseAppartenences");

                    b.Navigation("Courses");

                    b.Navigation("Grades");

                    b.Navigation("Notifications");
                });
#pragma warning restore 612, 618
        }
    }
}