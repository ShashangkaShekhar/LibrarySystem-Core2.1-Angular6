using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels.ViewModels
{
    public class vmLoggeduser
    {
        public int? Userid { get; set; }
        public int? Usertype { get; set; }
        public string Username { get; set; }
        public string Displayname { get; set; }
        public string Email { get; set; }
    }
}
