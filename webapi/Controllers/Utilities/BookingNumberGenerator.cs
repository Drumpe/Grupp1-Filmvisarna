namespace webapi.Controllers.Utilities
{
    public static class BookingNumberGenerator
    {
        private static Random random = new Random();
        private const string letters = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
        private const string digits = "0123456789";
        public static string GenerateRandomNumber()
        {
            var randomLetters = new string(Enumerable.Repeat(letters, 3)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            var randomDigits = new string(Enumerable.Repeat(digits, 3)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            return randomLetters + randomDigits;
        }
    }

}