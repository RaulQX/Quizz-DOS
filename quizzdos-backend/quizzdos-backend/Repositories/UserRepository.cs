using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using quizzdos_backend.DTOs;
using quizzdos_EFCore;
using quizzdos_EFCore.Entities.Users;
using quizzdos_EFCore.Enums;

namespace quizzdos_backend.Repositories
{
    public interface IUserRepository
    {
        public CurrentUserDTO? GetUser();
        public Task<User> AddUserAsync(User user);
        public Task<User?> GetUserByAnyField(string? username, string? email, string? phoneNumber);
    }
    public class UserRepository : IUserRepository
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly Context _context;
        public UserRepository(IHttpContextAccessor contextAccessor, Context context)
        {
            _contextAccessor = contextAccessor;
            _context = context;
        }
        public CurrentUserDTO? GetUser()
        {
            if (_contextAccessor.HttpContext != null)
            {
                return
                    new CurrentUserDTO()
                    {
                        Username = _contextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name),
                        Email = _contextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email),
                        PhoneNumber = _contextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.MobilePhone),
                        Id = new Guid(_contextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Sid)),
                        JoinedDate = DateTime.Parse(_contextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.DateOfBirth)).ToString("dd/MM/yyyy")
                    };
            }
            else return null;
        }

        public async Task<User> AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            return user;
        }

        public async Task<User?> GetUserByAnyField(string? username, string? email, string? phoneNumber)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username || u.Email == email || u.PhoneNumber == phoneNumber);
        }

    }
}
