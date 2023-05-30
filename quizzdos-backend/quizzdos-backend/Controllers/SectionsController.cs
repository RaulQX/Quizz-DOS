using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using quizzdos_backend.DTOs;
using quizzdos_backend.Repositories;
using quizzdos_EFCore.Entities.Courses;

namespace quizzdos_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionsController : ControllerBase
    {
        private readonly ISectionRepository _sectionRepository;

        public SectionsController(ISectionRepository sectionRepository)
        {
            _sectionRepository = sectionRepository;
        }


        [HttpPost]
        [ProducesResponseType(typeof(Section), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult> AddSection(SectionDTO section)
        {
            var sec = await _sectionRepository.AddSectionAsync(section);
            return Ok(sec);
        }

        [HttpDelete]
        [ProducesResponseType(typeof(Section), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult> DeleteSection(Guid sectionId)
        {
            var section = await _sectionRepository.DeleteSectionAsync(sectionId);
            if (section == null)
                return NotFound($"Section: {sectionId} was not found!");
            return Ok(section);
        }

        [HttpPut]
        [ProducesResponseType(typeof(Section), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult> UpdateSection(Guid sectionId, SectionDTO section)
        {
            var sec = await _sectionRepository.UpdateSectionAsync(sectionId, section);
            if (sec == null)
                return NotFound($"Section: {sectionId} was not found!");
            return Ok(sec);
        }
    }
}
