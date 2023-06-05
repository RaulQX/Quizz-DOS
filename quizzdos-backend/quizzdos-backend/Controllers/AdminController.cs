using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using quizzdos_backend.DTOs;
using quizzdos_backend.Paging;
using quizzdos_backend.Repositories;
using quizzdos_EFCore.Entities.Users;
using quizzdos_EFCore.Enums;

namespace quizzdos_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;

        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpGet("dashboard")]
        [ProducesResponseType(typeof(AdminDashboardDTO), 200)]
        public async Task<IActionResult> GetAdminDashboard()
        {
            var adminDashboard = await _adminRepository.GetAdminDashboard();
            return Ok(adminDashboard);
        }

        [HttpGet("people")]
        [ProducesResponseType(typeof(PaginatedResponse<DiplayCourseDTO>), 200)]
        public async Task<ActionResult> GetCreatedCoursesPaged(string? name, int pageParam = 1, int pageSize = 1)
        {
            name ??= "";
            var courses = await _adminRepository.GetPeoplePaged(name, pageParam, pageSize);
            return Ok(courses);
        }
        [HttpPut("{personId:Guid}/role")]
        [ProducesResponseType(typeof(Person), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult<Person>> UpdatePersonRole(Guid personId, ERole role)
        {
            var updatedPerson = await _adminRepository.UpdatePersonRoleByIdAsync(personId, role);
            if (updatedPerson == null)
                return BadRequest($"Failed to update person with id: {personId}");

            return Ok(updatedPerson);
        }

    }
}
