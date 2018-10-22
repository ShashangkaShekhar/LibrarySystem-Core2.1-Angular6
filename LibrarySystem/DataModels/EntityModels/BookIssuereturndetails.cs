using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class BookIssuereturndetails
    {
        public int Id { get; set; }
        public int? Issueid { get; set; }
        public int? Bookid { get; set; }
    }
}
