using System.Security.Cryptography;
using System.Text;

namespace webapi.Controllers.Utilities
{
    public class PasswordEncryptor
    {
        private const string salt = "y/{}dZ!+-bA";

        public static string HashPassword(string password)
        {
            // convert password characters and salt into binary according to UTF-8 encoding
            var bytes = Encoding.UTF8.GetBytes(password + salt);
            // hashing algorithm that requires binary data
            var hashedBytes = SHA256.HashData(bytes);
            // resulting string: Base64-encoded representation of the SHA256 as a string
            return Convert.ToBase64String(hashedBytes);
        }
    }
}