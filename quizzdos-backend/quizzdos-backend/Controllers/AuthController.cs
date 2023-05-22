using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using quizzdos_backend.DTOs;
using quizzdos_backend.Repositories;
using quizzdos_backend.Validation;
using quizzdos_EFCore.Entities.Users;

namespace quizzdos_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IValidationRepository _validationRepository;
        private readonly IPersonRepository _personRepository;
        private readonly IUserRepository _userRepository;

        public AuthController(
            IAuthRepository authRepository,
            IValidationRepository validationRepository,
            IPersonRepository personRepository,
            IUserRepository userRepository)
        {
            _authRepository = authRepository;
            _validationRepository = validationRepository;
            _personRepository = personRepository;
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        [ProducesResponseType(typeof(User), 200)]
        [ProducesResponseType(typeof(ValidationResponse), 400)]
        public async Task<ActionResult<User?>> Register(UserDTO request)
        {
            var userExists = await _validationRepository.CheckUniqueUser(request);
            var isUsernameValid =  _validationRepository.CheckUsername(request.Username);
            var isPhoneNumberValid =  _validationRepository.CheckPhoneNumber(request.PhoneNumber);
            var isEmailValid =  _validationRepository.CheckEmail(request.Email);
            var isPasswordValid =  _validationRepository.CheckPassword(request.Password);

            if (userExists != null || isUsernameValid != null || isPhoneNumberValid != null || isEmailValid != null || isPasswordValid != null)
            {
                return BadRequest(new ValidationResponse
                {
                    ExistingUserResponse = userExists,
                    UsernameValidationResponse = isUsernameValid,
                    PhoneNumberValidationResponse = isPhoneNumberValid,
                    EmailValidationResponse = isEmailValid,
                    PasswordValidationResponse = isPasswordValid
                });
            }

            User newUser = await _authRepository.Register(request);

            return Ok(newUser);
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult<string>> Login([FromBody] UserDTO request)
        {
            var user = await _userRepository.GetUserByAnyField(request.Username, request.Email, request.PhoneNumber);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var isPasswordVerified = _authRepository.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt);
            if (!isPasswordVerified)
            {
                return BadRequest("Wrong password");
            }
            string token = _authRepository.CreateToken(user);

            return Ok("bearer " + token);
        }
    }
}
