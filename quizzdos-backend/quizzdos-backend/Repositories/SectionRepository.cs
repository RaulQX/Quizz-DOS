using quizzdos_backend.DTOs;
using quizzdos_EFCore;
using quizzdos_EFCore.Entities.Courses;

namespace quizzdos_backend.Repositories
{
    public interface ISectionRepository
    {
        public Task<Section?> AddSectionAsync(SectionDTO addingSection);
        public Task<Section?> DeleteSectionAsync(Guid sectionId);
        public Task<Section?> UpdateSectionAsync(Guid sectionId, SectionDTO updatedSection);
    }
    public class SectionRepository : ISectionRepository
    {
        private readonly Context _context;

        public SectionRepository(Context context)
        {
            _context = context;
        }
        public async Task<Section?> AddSectionAsync(SectionDTO addingSection)
        {
            var section = new Section
            {
                CourseId = addingSection.CourseId,
                Name = addingSection.Name,
                Summary = addingSection.Summary
            };

           
            await _context.Sections.AddAsync(section);
            await _context.SaveChangesAsync();
            return section;
        }

        public async Task<Section?> DeleteSectionAsync(Guid sectionId)
        {
            var section = await _context.Sections.FindAsync(sectionId);
            if (section == null)
            {
                return null;
            }
            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();
            return section;
        }

        public async Task<Section?> UpdateSectionAsync(Guid sectionId, SectionDTO updatedSection)
        {
            var section = await _context.Sections.FindAsync(sectionId);
            if (section == null)
            {
                return null;
            }
            section.Name = updatedSection.Name;
            section.Summary = updatedSection.Summary;
            await _context.SaveChangesAsync();
            return section;
        }
    }
}
