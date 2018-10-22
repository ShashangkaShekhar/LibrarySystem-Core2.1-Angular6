using DataModels.EntityModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels.ViewModels
{
    public class vmBookIssue
    {
        public int Id { get; set; }
        public string Membername { get; set; }
        public string Email { get; set; }
        public string Duedate { get; set; }

        public List<Book> Books { get; set; }
    }
}
