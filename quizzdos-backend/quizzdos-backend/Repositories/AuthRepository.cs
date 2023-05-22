using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using quizzdos_backend.DTOs;
using quizzdos_EFCore;
using quizzdos_EFCore.Entities.Users;

namespace quizzdos_backend.Repositories
{
    public interface IAuthRepository
    {
        Task<User> Register(UserDTO request);
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        string CreateToken(User user);
        bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
    }

    public class AuthRepository : IAuthRepository
    {
        private readonly IConfiguration _configuration;
        private readonly Context _context;

        private readonly IUserRepository _userRepository;
        private readonly IPersonRepository _personRepository;

        public AuthRepository(Context context, IConfiguration configuration, 
            IUserRepository userRepository, IPersonRepository personRepository)
        {
            _configuration = configuration;
            _context = context;
            _userRepository = userRepository;
            _personRepository = personRepository;
        }

        public async Task<User> Register(UserDTO request)
        {
            User newUser = new();

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            newUser.Username = request.Username;
            newUser.Email = request.Email;
            newUser.PhoneNumber = request.PhoneNumber;
            newUser.Created = DateTime.Now;
           
            newUser.PasswordHash = passwordHash;
            newUser.PasswordSalt = passwordSalt;

            await _userRepository.AddUserAsync(newUser);
            await _personRepository.AddPersonAsync(newUser);
            await _context.SaveChangesAsync();

            return newUser;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

        public string CreateToken(User user)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.MobilePhone, user.PhoneNumber),
                new Claim(ClaimTypes.Sid, user.Id.ToString()),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(claims: claims,
                                             expires: DateTime.Now.AddDays(1),
                                             signingCredentials: cred);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }
    }
}
