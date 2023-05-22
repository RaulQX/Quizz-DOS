using System.Globalization;
using Microsoft.EntityFrameworkCore;
using quizzdos_EFCore;
using quizzdos_EFCore.Entities.Users;
using quizzdos_EFCore.Enums;

namespace quizzdos_backend.Repositories
{
    public interface IPersonRepository
    {
        Task<Person?> GetPersonByIdAsync(Guid id);
        Task<Person> AddPersonAsync(User user);
        Task<Person?> UpdatePersonalDetailsByIdAsync(Guid personId, string firstName, string lastName, EGender gender);
        Task<Person?> UpdatePersonRoleByIdAsync(Guid personId, ERole role);
        Task<Person?> DeletePersonByIdAsync(Guid personId);


    }
    public class PersonRepository : IPersonRepository
    {
        private readonly Context _context;
        public PersonRepository(Context context)
        {
            _context = context;
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
            return person;
        }

        public async Task<Person?> UpdatePersonRoleByIdAsync(Guid personId, ERole role)
        {
            var person = await GetPersonByIdAsync(personId);

            if (person == null)
            {
                return null;
            }

            person.Role = role;
            await _context.SaveChangesAsync();
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

    }
}
