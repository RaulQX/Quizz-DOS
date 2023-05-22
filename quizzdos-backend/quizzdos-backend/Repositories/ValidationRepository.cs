using Microsoft.EntityFrameworkCore;
using quizzdos_backend.DTOs;
using quizzdos_backend.Validation;
using quizzdos_EFCore;
using quizzdos_EFCore.Entities.Users;
using System.Text.RegularExpressions;

namespace quizzdos_backend.Repositories
{
    public interface IValidationRepository
    {
        Task<ExistingUserResponse?> CheckUniqueUser(UserDTO request);
        UsernameValidationResponse? CheckUsername(string username);
        PhoneNumberValidationResponse? CheckPhoneNumber(string phoneNumber);
        EmailValidationResponse? CheckEmail(string email);
        PasswordValidationResponse? CheckPassword(string password);
    }
    public class ValidationRepository : IValidationRepository
    {
        private readonly Context _context;

        public ValidationRepository(Context context)
        {
            _context = context;
        }

        public EmailValidationResponse? CheckEmail(string email)
        {
            var res = new EmailValidationResponse();

            res.EmailEmpty.Error = string.IsNullOrWhiteSpace(email);
            res.EmailTooShort.Error = (email.Length < 5);
            res.EmailTooLong.Error = (email.Length >= 100);
            res.EmailFormat.Error = !Regex.IsMatch(email, @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");

            if (res.EmailEmpty.Error || res.EmailTooShort.Error || res.EmailTooLong.Error || res.EmailFormat.Error) 
            { 
                return res; 
            }

            return null;
        }

        public PasswordValidationResponse? CheckPassword(string password)
        {
            var res = new PasswordValidationResponse();

            res.PasswordEmpty.Error = string.IsNullOrWhiteSpace(password);
            res.PasswordTooShort.Error = (password.Length < 8);
            res.PasswordTooLong.Error = (password.Length >= 100);

            if (res.PasswordEmpty.Error || res.PasswordTooShort.Error || res.PasswordTooLong.Error)
            {
                return res;
            }

            return null;
        }

        public PhoneNumberValidationResponse? CheckPhoneNumber(string phoneNumber)
        {
            var res = new PhoneNumberValidationResponse();

            res.PhoneNumberEmpty.Error = string.IsNullOrWhiteSpace(phoneNumber);
            res.PhoneNumberLength.Error = phoneNumber.Length != 10;
            res.PhoneNumberFormat.Error = !Regex.IsMatch(phoneNumber, @"^(\d{10})$");

            if (res.PhoneNumberEmpty.Error || res.PhoneNumberLength.Error || res.PhoneNumberFormat.Error)
            {
                return res;
            }

            return null;
        }

        public async Task<ExistingUserResponse?> CheckUniqueUser(UserDTO user)
        {
            var res = new ExistingUserResponse();

            res.UsernameAlreadyExists.Error = await _context.Users.AnyAsync(u => u.Username == user.Username);
            res.EmailAlreadyExists.Error = await _context.Users.AnyAsync(u => u.Email == user.Email);
            res.PhoneNumberAlreadyExists.Error = await _context.Users.AnyAsync(u => u.PhoneNumber == user.PhoneNumber);

            if (res.UsernameAlreadyExists.Error || res.EmailAlreadyExists.Error || res.PhoneNumberAlreadyExists.Error)
            {
                return res;
            }

            return null;
        }

        public UsernameValidationResponse? CheckUsername(string username)
        {
            var res = new UsernameValidationResponse();

            res.UsernameEmpty.Error = string.IsNullOrWhiteSpace(username);
            res.UsernameTooShort.Error = (username.Length < 5);
            res.UsernameTooLong.Error = (username.Length >= 100);
            res.UsernameFormat.Error = !Regex.IsMatch(username, @"^([a-zA-Z0-9_\-\.]+)$");

            if (res.UsernameEmpty.Error || res.UsernameTooShort.Error || res.UsernameTooLong.Error || res.UsernameFormat.Error)
            {
                return res;
            }

            return null;
        }
    }
}