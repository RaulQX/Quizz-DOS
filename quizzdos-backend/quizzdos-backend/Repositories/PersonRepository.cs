using System.Globalization;
using Microsoft.EntityFrameworkCore;
using quizzdos_backend.DTOs;
using quizzdos_EFCore;
using quizzdos_EFCore.Entities.Users;
using quizzdos_EFCore.Enums;

namespace quizzdos_backend.Repositories
{
    public interface IPersonRepository
    {
        Task<Person?> GetPersonByIdAsync(Guid id);
        Task<Person?> GetPersonByUserIdAsync(Guid userId);
        Task<Person> AddPersonAsync(User user);
        Task<Person?> UpdatePersonalDetailsByIdAsync(Guid personId, string firstName, string lastName, EGender gender);
        Task<Person?> DeletePersonByIdAsync(Guid personId);
        Task<PersonSettingsDTO?> GetPersonSettings(Guid personId);
    }
    public class PersonRepository : IPersonRepository
    {
        private readonly Context _context;
        private readonly INotificationRepository _notificationRepository;

        public PersonRepository(Context context)
        {
            _context = context;
            _notificationRepository = new NotificationRepository(context);
        }

        public async Task<Person?> GetPersonByUserIdAsync(Guid userId)
        {
            return await _context.People.FirstOrDefaultAsync(p => p.UserId == userId);
        }

        public async Task<Person?> GetPersonByIdAsync(Guid personId)
        {
            return await _context.People.FindAsync(personId);
        }
        public async Task<Person> AddPersonAsync(User user)
        {
            Person person = new(user);
            await _context.People.AddAsync(person);

            return person;
        }
        public async Task<Person?> UpdatePersonalDetailsByIdAsync(Guid personId, string firstName, string LastName, EGender gender)
        {
            var person = await GetPersonByIdAsync(personId);

            if (person == null)
            {
                return null;
            }
            person.Gender = gender;
            person.FirstName = firstName;
            person.LastName = LastName;
            await _context.SaveChangesAsync();

            await _notificationRepository.AddNotification(
                title: "Personal details updated successfully",
                text: "Your personal details have been updated successfully",
                personId: personId
                );

            return person;
        }
        public async Task<Person?> DeletePersonByIdAsync(Guid personId)
        {
            var person = await GetPersonByIdAsync(personId);

            if (person == null)
            {
                return null;
            }
            _context.People.Remove(person);
            await _context.SaveChangesAsync();
            return person;
        }

        public async Task<PersonSettingsDTO?> GetPersonSettings(Guid personId)
        {
            var person = await _context.People.Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == personId);

            if (person == null)
            {
                return null;
            }

            return new PersonSettingsDTO { Gender = person.Gender, Email = person.User.Email, FirstName = person.FirstName, LastName = person.LastName, PhoneNumber = person.User.PhoneNumber, Role = person.Role, Username = person.User.Username };
        }
    }
}
