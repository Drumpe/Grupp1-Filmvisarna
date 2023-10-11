using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapi.Controllers.Utilities
{
    public class ConfigEmail
    {
        public string EmailForServerSentEmails { get; set; }
        public string PasswordForServerSentEmails { get; set; }
    }
}