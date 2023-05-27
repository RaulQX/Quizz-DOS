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
