using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using quizzdos_backend.DTOs;
using quizzdos_EFCore;
using quizzdos_EFCore.Entities.Courses;
using quizzdos_EFCore.Enums;
using quizzdos_EFCore.Relations.ManyToMany;
using System.Text;

namespace quizzdos_backend.Repositories
{
    public interface IQuizRepository
    {
        public Task<QuizDTO?> AddQuizAsync(QuizDTO addingQuiz);
        public Task<Quiz?> DeleteQuizAsync(Guid quizId);
        public Task<UpdateQuizDTO?> UpdateQuizAsync(Guid quizId, UpdateQuizDTO updatedQuiz);
        public Task<List<QuestionDTO>> GetQuizQuestions(Guid quizzId);
        public Task<List<QuizQuestionDTO>?> UpdateQuizQuestions(Guid quizzId, List<QuizQuestionDTO> newQuestions);
        public Task<StartQuizDTO?> GetQuizForStudent(Guid quizId, Guid personId);
        public Task<bool?> AddQuizGrade(Guid quizId, Guid personId, double grade);
        public Task<string?> GetTip(Guid questionId);
    }


    public class QuizRepository : IQuizRepository
    {
        private readonly Context _context;
        private readonly string _apiKey;
        private readonly INotificationRepository _notificationRepository;

        public QuizRepository(Context context, IConfiguration config, INotificationRepository notificationRepository)
        {
            _apiKey = config.GetValue<string>("ApiKey");
            _context = context;
            _notificationRepository = notificationRepository;
        }
        public async Task<QuizDTO?> AddQuizAsync(QuizDTO addingQuiz)
        {
            var section = await _context.Sections.FindAsync(addingQuiz.SectionId);
            if (section == null)
                return null; 
            var quiz = new Quiz { Name = addingQuiz.Name, SectionId = addingQuiz.SectionId, Status = EQuizStatus.Unopened };

            await _context.AddAsync(quiz);
            await _context.SaveChangesAsync();

            var savedQuiz = await GetFullQuizDetails(quiz.Id);
            if (savedQuiz == null)
                return null;

            await _notificationRepository.AddNotification(
                title: $"Quiz {quiz.Name} added successfully!",
                text: $"Quiz {quiz.Name} was added to section {section.Name}!",
                personId: savedQuiz.Section.Course.CreatorId
                );

            return addingQuiz;
        }

        public async Task<bool?> AddQuizGrade(Guid quizId, Guid personId, double grade)
        {
            var quiz = await _context.Quizzes.FindAsync(quizId);
            if (quiz == null)
                return null;

            var person = await _context.People.FindAsync(personId);
            if (person == null)
                return null;

            if (grade < 0 || grade > 10)
                return false;

            var addingGrade = new Grade { GradeValue = Convert.ToDouble(String.Format("{0:0.00}", grade)), PersonId = personId, QuizId = quizId }; 
            await _context.Grades.AddAsync(addingGrade);
            await _context.SaveChangesAsync();

            await _notificationRepository.AddNotification(
                title: $"Quiz graded!",
                text: $"The quiz '{quiz.Name}' was graded with {grade}!",
                personId: personId
                );

            return true;
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

        public async Task<StartQuizDTO?> GetQuizForStudent(Guid quizId, Guid personId)
        {
            var quiz = await _context.Quizzes
                .Include(quiz => quiz.Section)
                .Include(quiz => quiz.Questions)
                .ThenInclude(quest => quest.Options)
                .FirstOrDefaultAsync(q => q.Id == quizId);

            if (quiz == null)
                return null;

            return new StartQuizDTO
                {
                    Grade = quiz.Grades.OrderByDescending(g => g.GradeValue).FirstOrDefault(g => g.PersonId == personId)?.GradeValue ?? 0,
                    QuestionsNumber = (uint)quiz.Questions.Count,
                    SectionName = quiz.Section.Name,
                    Status = quiz.Status,
                    Title = quiz.Name,
                    Questions = quiz.Questions.Select(question => new QuestionDTO
                    {
                        Id = question.Id,
                        Options = question.Options.Select(option => new OptionDTO
                        {
                            Id = option.Id,
                            Text = option.Text,
                            ScorePercentage = option.ScorePercentage
                        }).ToList(),
                        Prompt = question.Prompt,
                        QuestionScore = question.QuestionScore,
                        TipAllowed = question.TipAllowed
                    }).ToList()
                };

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

        public async Task<string?> GetTip(Guid questionId)
        {
            var question = await _context.Questions.Where(q => q.Id == questionId)
                .Include(q => q.Options)
                .Select(q =>
                    new QuestionWithCorrectAndWrongAnswersDTO
                    {
                        Prompt = q.Prompt,
                        CorrectOptions = q.Options.Where(o => o.ScorePercentage > 0).Select(o => new QuestionOptionDTO { Text = o.Text, ScorePercentage = o.ScorePercentage }).ToList(),
                        WrongOptions = q.Options.Where(o => o.ScorePercentage == 0).Select(o => new QuestionOptionDTO { Text = o.Text, ScorePercentage = o.ScorePercentage }).ToList()
                    }).FirstOrDefaultAsync();


            if (question == null)
                return null;
           
            string wrongOpts = question.WrongOptions.Aggregate("", (acc, x) => acc + x.Text + "; ");
            string correctOpts = question.CorrectOptions.Aggregate("", (acc, x) => acc + x.Text + "; ");
            var apiKey = _apiKey;
            var prompt =
                "Pretend you are an automated quiz hint giver. " +
                "I will write a question and one or more answers. " +
                "Give a hint of the answers of the question that will be written without giving away the answer. " +
                "Do not rephrase the question with the answer in it. Do not rephrase the given answer while answering the question. " +
                "Make it not obvious. Do not write numbers using letters. Do not complete the answers, answer in a separate phrase. " +
                "If it is a mathematical question, give the formula or how to derive it from known information." +
                $"This is the question: {question.Prompt} " +
                "These are the the wrong options:" + wrongOpts +
                ".This is/are the correct answers:" + correctOpts
                ;
            var url = $"https://api.openai.com/v1/completions";
            using var client = new HttpClient();

            var jsonBody = new JObject
            {
                ["model"] = "text-davinci-003",
                ["prompt"] = prompt,
                ["temperature"] = 0,
                ["max_tokens"] = 1000
            };

            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", apiKey);
            var content = new StringContent(jsonBody.ToString(), Encoding.UTF8, "application/json");
            var response = await client.PostAsync(url, content);

            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine("Error with Status Code: " + response.StatusCode);
                return null;
            }

            var json = JsonConvert.DeserializeObject<dynamic>(response.Content.ReadAsStringAsync().Result);
            if (json == null) return null;
            string completion = json.choices[0].text;
            return completion.Trim();
        }
        public async Task<Quiz?> GetFullQuizDetails(Guid quizId)
        {
            return await _context.Quizzes
                .Include(q => q.Section)
                .ThenInclude(q => q.Course)
                .FirstOrDefaultAsync(q => q.Id == quizId);
                
        }
        public async Task<List<Guid>> GetCourseParticipantsAndProfessor(Quiz quiz)
        {
            var courseId = quiz.Section.CourseId;
            var studentsIds = await _context.CourseAppartenences.Where(ca => ca.CourseId == courseId).Select(ca => ca.PersonId).ToListAsync();
            var peopleIds = studentsIds.Where(id => id != null).Select(id => id.Value).ToList();
            peopleIds.Add(quiz.Section.Course.CreatorId);

            return peopleIds;
        }
        public async Task<UpdateQuizDTO?> UpdateQuizAsync(Guid quizId, UpdateQuizDTO updatedQuiz)
        {
            var quiz = await GetFullQuizDetails(quizId);
            if (quiz == null)
                return null;

            quiz.Name = updatedQuiz.Name;
            quiz.Status = updatedQuiz.Status;
            await _context.SaveChangesAsync();

           var peopleIds = await GetCourseParticipantsAndProfessor(quiz);

            await _notificationRepository.BulkAddNotification(
                title: "Quiz Updated",
                text: $"The quiz '{quiz.Name}' has been updated",
                personIds: peopleIds
                );

            return updatedQuiz;
        }

        public async Task<List<QuizQuestionDTO>?> UpdateQuizQuestions(Guid quizId, List<QuizQuestionDTO> updatedQuestions)
        {
            var quiz = await _context.Quizzes
                .Include(q => q.Section)
                .ThenInclude(s => s.Course)
                .Include(q => q.Questions)
                .ThenInclude(q => q.Options)
                .FirstOrDefaultAsync(q => q.Id == quizId);
            if (quiz == null)
                return null;

            var questionsToDelete = quiz.Questions.Where(q => !updatedQuestions.Any(uq => uq.Id == q.Id)).ToList();
            _context.Questions.RemoveRange(questionsToDelete);

            foreach (var updatedQuestion in updatedQuestions)
            {
                var existingQuestion = _context.Questions.FirstOrDefault(q => q.Id == updatedQuestion.Id);

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

                    _context.Options.AddRange(existingQuestion.Options);

                    _context.Entry(existingQuestion).State = EntityState.Modified;
                    _context.Questions.Update(existingQuestion);
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

            var peopleIds = await GetCourseParticipantsAndProfessor(quiz);
            await _notificationRepository.BulkAddNotification(
                               title: "Quiz Updated",
                               text: $"The quiz '{quiz.Name}' has been updated",
                               personIds: peopleIds
                               );

            return updatedQuestions;
        }
    
        public async Task<AccessedQuizDTO?> UpdateQuizStatus(Guid quizId, EQuizStatus status)
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
