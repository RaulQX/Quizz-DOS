﻿using Microsoft.EntityFrameworkCore;
using quizzdos_backend.DTOs;
using quizzdos_EFCore;
using quizzdos_EFCore.Entities.Courses;
using quizzdos_EFCore.Enums;

namespace quizzdos_backend.Repositories
{
    public interface IQuizRepository
    {
        public Task<QuizDTO?> AddQuizAsync(QuizDTO addingQuiz);
        public Task<Quiz?> DeleteQuizAsync(Guid quizId);
        public Task<UpdateQuizDTO?> UpdateQuizAsync(Guid quizId, UpdateQuizDTO updatedQuiz);
        public Task<AccessedQuizDTO?> UpdateQuizStatus(Guid quizId, QuizStatus status);
        public Task<List<QuestionDTO>> GetQuizQuestions(Guid quizzId);
        public Task<List<QuizQuestionDTO>?> UpdateQuizQuestions(Guid quizzId, List<QuizQuestionDTO> newQuestions);
             
    }
    public class QuizRepository : IQuizRepository
    {
        private readonly Context _context;
        public QuizRepository(Context context)
        {
            _context = context;
        }
        public async Task<QuizDTO?> AddQuizAsync(QuizDTO addingQuiz)
        {
            var section = await _context.Sections.FindAsync(addingQuiz.SectionId);
            if (section == null)
                return null; 
            var quiz = new Quiz { Name = addingQuiz.Name, SectionId = addingQuiz.SectionId, Status = QuizStatus.Unopened };

            await _context.AddAsync(quiz);
            await _context.SaveChangesAsync();

            return addingQuiz;
        }

        public async Task<Quiz?> DeleteQuizAsync(Guid quizId)
        {
            var quiz = await _context.Quizzes.FindAsync(quizId);
            if (quiz == null)
                return null;

            _context.Quizzes.Remove(quiz);
            await _context.SaveChangesAsync();
            return quiz;
        }

        public async Task<List<QuestionDTO>> GetQuizQuestions(Guid quizzId)
        {
            return  await _context.Questions
                         .Where(q => q.QuizId == quizzId)
                         .Select(question => new QuestionDTO
                         {
                             Id = question.Id,
                             Options = _context.Options
                                 .Where(o => o.QuestionId == question.Id)
                                 .Select(option => new OptionDTO
                                 {
                                     Id = option.Id,
                                     Text = option.Text,
                                     ScorePercentage = option.ScorePercentage
                                 })
                                 .ToList(),
                             Prompt = question.Prompt,
                             QuestionScore = question.QuestionScore,
                             TipAllowed = question.TipAllowed
                         })
                         .ToListAsync();
        }

        public async Task<UpdateQuizDTO?> UpdateQuizAsync(Guid quizId, UpdateQuizDTO updatedQuiz)
        {
            var quiz = await _context.Quizzes.FindAsync(quizId);
            if (quiz == null)
                return null;

            quiz.Name = updatedQuiz.Name;
            quiz.Status = updatedQuiz.Status;
            await _context.SaveChangesAsync();
            return updatedQuiz;
        }

        public async Task<List<QuizQuestionDTO>?> UpdateQuizQuestions(Guid quizId, List<QuizQuestionDTO> updatedQuestions)
        {
            var quiz = await _context.Quizzes.Include(q => q.Questions)
                .ThenInclude(q => q.Options)
                .FirstOrDefaultAsync(q => q.Id == quizId);
            if (quiz == null)
                return null;

            var questionsToDelete = quiz.Questions.Where(q => !updatedQuestions.Any(uq => uq.Id == q.Id)).ToList();
            _context.Questions.RemoveRange(questionsToDelete);

            foreach (var updatedQuestion in updatedQuestions)
            {
                var existingQuestion = quiz.Questions.FirstOrDefault(q => q.Id == updatedQuestion.Id);

                if (existingQuestion != null)
                {
                    existingQuestion.Prompt = updatedQuestion.Prompt;
                    existingQuestion.QuestionScore = updatedQuestion.QuestionScore;
                    existingQuestion.TipAllowed = updatedQuestion.TipAllowed;

                    _context.Options.RemoveRange(existingQuestion.Options);

                    await _context.SaveChangesAsync();

                    existingQuestion.Options = updatedQuestion.Options.Select(option =>
                        new Option
                        {
                            QuestionId = existingQuestion.Id,
                            Text = option.Text,
                            ScorePercentage = option.ScorePercentage
                        }).ToList();

                    _context.Entry(existingQuestion).State = EntityState.Modified;
                }
                else
                {
                    var newQuestion = new Question
                    {
                        Id = Guid.NewGuid(),
                        QuizId = quizId,
                        Prompt = updatedQuestion.Prompt,
                        QuestionScore = updatedQuestion.QuestionScore,
                        TipAllowed = updatedQuestion.TipAllowed,
                        Options = updatedQuestion.Options.Select(option =>
                            new Option
                            {
                                Id = Guid.NewGuid(),
                                QuestionId = updatedQuestion.Id,
                                Text = option.Text,
                                ScorePercentage = option.ScorePercentage
                            }).ToList()
                    };

                    quiz.Questions.Add(newQuestion);
                    _context.Options.AddRange(newQuestion.Options);
                    _context.Entry(newQuestion).State = EntityState.Added;
                }
               
            }
            await _context.SaveChangesAsync();
            return updatedQuestions;
        }
    
        public async Task<AccessedQuizDTO?> UpdateQuizStatus(Guid quizId, QuizStatus status)
        {
            var quiz = await _context.Quizzes.FindAsync(quizId);
            if (quiz == null)
                return null;

            quiz.Status = status;
            await _context.SaveChangesAsync();
            return new AccessedQuizDTO { Name = quiz.Name, Status = quiz.Status, Id = quiz.Id };
        }
    }
}
