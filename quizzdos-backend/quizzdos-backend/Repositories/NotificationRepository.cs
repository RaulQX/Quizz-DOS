using Microsoft.EntityFrameworkCore;
using quizzdos_backend.DTOs;
using quizzdos_EFCore;
using quizzdos_EFCore.Entities.Notifications;

namespace quizzdos_backend.Repositories
{
    public interface INotificationRepository
    {
        public Task<List<NotificationDTO>?> GetNotificationDTOs(Guid personId);
        public Task<bool> AddNotification(string title, string text, Guid personId);
        public Task<bool> BulkAddNotification(string title, string text, List<Guid> personIds);
        public Task<bool> MarkAsRead(List<Guid> notificationsIds);
    }
    public class NotificationRepository : INotificationRepository
    {
        private readonly Context _context;
        public NotificationRepository(Context context)
        {
            _context = context;
        }

        public async Task<bool> AddNotification(string title, string text, Guid personId)
        {
            var person = await _context.People.FirstOrDefaultAsync(p => p.Id == personId);

            if (person == null)
                return false;

            var notification = new Notification (personId, title, text);   

            await _context.Notifications.AddAsync(notification);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> BulkAddNotification(string title, string text, List<Guid> personIds)
        {
            var people = await _context.People.Where(p => personIds.Contains(p.Id)).ToListAsync();

            if (people == null) return false;

            var notifications = new List<Notification>();

            foreach (var person in people)
            {
                notifications.Add(new Notification(person.Id, title, text));
            }

            await _context.Notifications.AddRangeAsync(notifications);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<NotificationDTO>?> GetNotificationDTOs(Guid personId)
        {
            var notifications = await 
                _context.Notifications
                .Where(n => n.PersonId == personId)
                .OrderByDescending(n => n.DateReceived)
                .Select(n => new NotificationDTO
                {
                    DateReceived = n.DateReceived.ToShortDateString(),
                    Id = n.Id,
                    Read = n.Read,
                    Text = n.Text,
                    Title = n.Title
                })
                .ToListAsync();

            if (notifications == null)
                return null;

            return notifications;
        }

        public async Task<bool> MarkAsRead(List<Guid> notificationsIds)
        {
            var notifications = await _context.Notifications.Where(n => notificationsIds.Contains(n.Id)).ToListAsync();
            if (notifications == null) return false;

            notifications.ForEach(n => n.Read = true);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
