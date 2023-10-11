using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public void SendEmail(string to, string subject, string body)
        {
            using (var client = new SmtpClient(_emailConfig.SmtpServer, _emailConfig.SmtpPort))
            {
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(_emailConfig.Email, _emailConfig.Password);
                client.EnableSsl = true;

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_emailConfig.Email),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                mailMessage.To.Add(to);

                client.Send(mailMessage);
            }
        }
    }

}