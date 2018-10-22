using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class User
    {
        public int Id { get; set; }
        public int? Userid { get; set; }
        public int? Usertype { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
    }
}
