using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class UserAuthentication
    {
        public int Id { get; set; }
        public int? Userid { get; set; }
        public string Username { get; set; }
        public string Userpass { get; set; }
        public DateTime? Joindate { get; set; }
    }
}
