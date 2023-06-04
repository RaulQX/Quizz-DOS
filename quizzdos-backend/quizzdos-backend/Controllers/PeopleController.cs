using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using quizzdos_backend.Repositories;
using quizzdos_EFCore.Entities.Users;
using quizzdos_EFCore.Enums;

namespace quizzdos_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly IPersonRepository _personRepository;

        public PeopleController(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        [HttpGet("userid/{userId:Guid}")]
        [ProducesResponseType(typeof(Person), 200)]
        [ProducesResponseType(typeof(string), 404)]
        public async Task<ActionResult<Person>> GetPersonByUserId(Guid userId)
        {
            var person = await _personRepository.GetPersonByUserIdAsync(userId);
            if (person == null)
                return NotFound($"Cannot find person based on userId: {userId}");

            return Ok(person);
        }

        [HttpPut("{personId:Guid}")]
        [ProducesResponseType(typeof(Person), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult<Person>> UpdatePerson(Guid personId, string firstName, string lastName, EGender gender)
        {
            var updatedPerson = await _personRepository.UpdatePersonalDetailsByIdAsync(personId, firstName, lastName, gender);
            if (updatedPerson == null)
                return BadRequest($"Failed to update person with id: {personId}");

            return Ok(updatedPerson);
        }

        [HttpPut("{personId:Guid}/role")]
        [ProducesResponseType(typeof(Person), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult<Person>> UpdatePersonRole(Guid personId, ERole role)
        {
            var updatedPerson = await _personRepository.UpdatePersonRoleByIdAsync(personId, role);
            if (updatedPerson == null)
                return BadRequest($"Failed to update person with id: {personId}");

            return Ok(updatedPerson);
        }

    }
}
