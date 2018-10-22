using DataModels.EntityModels;
using DataModels.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.backoffice
{
    public class Report
    {
        private LibraryDBContext _ctx = null;

        public Report()
        {
            _ctx = new LibraryDBContext();
        }

        public async Task<List<vmBookchart>> getbookchart()
        {
            List<vmBookchart> bchart = null;

            try
            {
                using (_ctx)
                {
                    bchart = await (from p in _ctx.Book
                                    join c in _ctx.BookIssuereturndetails on p.Id equals c.Bookid into g
                                    select new vmBookchart
                                    {
                                        bid = p.Id,
                                        bname = p.Bookname,
                                        nissue = g.Count()
                                    }).ToListAsync();

                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return bchart;
        }

        public async Task<List<vmMemberchart>> getmemberchart()
        {
            List<vmMemberchart> mchart = null;

            try
            {
                using (_ctx)
                {
                    mchart = await (from p in _ctx.User
                                    join c in _ctx.BookIssuereturn on p.Id equals c.Issueto into g
                                    select new vmMemberchart
                                    {
                                        tid = p.Id,
                                        mname = p.Firstname,
                                        ntrans = g.Count()
                                    }).ToListAsync();

                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return mchart;
        }
    }
}
