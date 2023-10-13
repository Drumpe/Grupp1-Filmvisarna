using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text.Json;

namespace webapi.Controllers.Utilities
{
    public class EmailConfiguration
    {
        public string SmtpServer { get; set; }
        public int SmtpPort { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class EmailService
    {
        private readonly EmailConfiguration _emailConfig;

        public EmailService(EmailConfiguration emailConfig)
        {
            _emailConfig = emailConfig;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                Config config;
                string filePath = "Properties/config.json";

                using (Stream fileStream = File.OpenRead(filePath))
                {
                    config = await JsonSerializer.DeserializeAsync<Config>(fileStream);
                }

                EmailConfiguration emailConfig = new EmailConfiguration
                {
                    SmtpServer = "smtp.gmail.com",
                    SmtpPort = 587,
                    Email = config.EmailForServerSentEmails,
                    Password = config.PasswordForServerSentEmails
                };

                using (var client = new SmtpClient(emailConfig.SmtpServer, emailConfig.SmtpPort))
                using (var mailMessage = new MailMessage())
                {
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(emailConfig.Email, emailConfig.Password);
                    client.EnableSsl = true;

                    mailMessage.From = new MailAddress(emailConfig.Email);
                    mailMessage.Subject = subject;
                    mailMessage.Body = body;
                    mailMessage.IsBodyHtml = true;
                    mailMessage.To.Add(to);

                    client.Send(mailMessage);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Email Sending failed. {e.Message}");
                throw;
            }
        }
    }
}
