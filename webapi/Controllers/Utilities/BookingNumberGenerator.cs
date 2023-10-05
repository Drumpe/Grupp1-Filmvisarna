using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapi.Controllers.Utilities
{
    public static class BookingNumberGenerator
    {
        private static Random random = new Random();
        private const string lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
        private const string digits = "0123456789";
        public static string GenerateRandomBookingNumber()
        {
            var randomLetters = new string(Enumerable.Repeat(lowercaseLetters, 3)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            var randomDigits = new string(Enumerable.Repeat(digits, 3)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            return randomLetters + randomDigits;
        }
    }

}