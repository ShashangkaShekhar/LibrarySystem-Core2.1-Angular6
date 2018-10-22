using DataModels.EntityModels;
using System.Collections.Generic;

namespace DataModels.ViewModels
{
    public class vmBookIssuereturn
    {
        public int Id { get; set; }
        public int? Issueid { get; set; }
        public int? Memberid { get; set; }
        public string Membername { get; set; }
        public string Email { get; set; }
        public string Issuedate { get; set; }
        public string Duedate { get; set; }
        public string Returndate { get; set; }
        public bool? Status { get; set; }

        public List<Book> Books { get; set; }
    }
}
