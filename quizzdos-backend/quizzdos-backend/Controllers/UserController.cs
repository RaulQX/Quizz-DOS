using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using quizzdos_backend.DTOs;
using quizzdos_backend.Repositories;

namespace quizzdos_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("current-user")]
        [ProducesResponseType(typeof(CurrentUserDTO), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public ActionResult<CurrentUserDTO> GetUser()
        {
            var user = _userRepository.GetUser();
            if (user == null)
                return BadRequest("Failed to get user" );

            return Ok(user);
        }

    }
}
