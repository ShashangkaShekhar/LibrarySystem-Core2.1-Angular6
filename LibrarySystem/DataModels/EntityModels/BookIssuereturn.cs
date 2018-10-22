using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class BookIssuereturn
    {
        public int Id { get; set; }
        public int? Issueid { get; set; }
        public int? Issueto { get; set; }
        public DateTime? Issuedate { get; set; }
        public DateTime? Duedate { get; set; }
        public DateTime? Returndate { get; set; }
        public bool? Status { get; set; }
    }
}
