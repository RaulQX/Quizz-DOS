using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using quizzdos_backend.DTOs;
using quizzdos_backend.Repositories;

namespace quizzdos_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationsController(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        [HttpGet("{personId:Guid}")]
        [ProducesResponseType(typeof(List<NotificationDTO>), 200)]
        [ProducesResponseType(typeof(string), 404)]
        public async Task<ActionResult> GetNotifications(Guid personId)
        {
            var notifications = await _notificationRepository.GetNotificationDTOs(personId);

            if (notifications == null)
                return NotFound($"Notifications for person: {personId} was not found!");

            return Ok(notifications);
        }

        [HttpPut]
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult> UpdateNotification(List<string> notificationIds)
        {
            var guidNotificationIds = notificationIds.Select(Guid.Parse).ToList();

            var successfulUpdated = await _notificationRepository.MarkAsRead(guidNotificationIds);
            if (!successfulUpdated)
                return BadRequest($"Could not update notifications!");

            return Ok(successfulUpdated);
        }
        [HttpGet("{personId:Guid}/unread")]
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(typeof(string), 404)]
        public async Task<ActionResult> GetUnreadNotifications(Guid personId)
        {
            var unreadNotifications = await _notificationRepository.HasUnreadNotifications(personId);
            if (unreadNotifications == null)
                return NotFound($"Notifications for person: {personId} was not found!");

            return Ok(unreadNotifications);
        }
    }
}
