using System;
using System.Collections.Generic;

namespace DataModels.EntityModels
{
    public partial class Book
    {
        public int Id { get; set; }
        public int? Bookid { get; set; }
        public int? Authorid { get; set; }
        public int? Category { get; set; }
        public string Bookname { get; set; }
        public string Coverimage { get; set; }
        public string Description { get; set; }
    }
}
