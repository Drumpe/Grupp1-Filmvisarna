using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapi.Controllers.Utilities
{
    public class Config
    {
        //Använder data från Properties/config.json
        public string EmailForServerSentEmails { get; set; }
        public string PasswordForServerSentEmails { get; set; }
    }
}