using DataModels.EntityModels;
using DataModels.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.backoffice
{
    public class Dashboard
    {
        private LibraryDBContext _ctx = null;

        public Dashboard()
        {
            _ctx = new LibraryDBContext();
        }

        public async Task<vmSummary> getallsummary()
        {
            vmSummary summary = null;

            try
            {
                using (_ctx)
                {
                    var tmember = await (from u in _ctx.User select u).CountAsync();
                    var tbook = await (from b in _ctx.Book select b).CountAsync();
                    var tissued = await (from i in _ctx.BookIssuereturn
                                         where i.Status == false
                                         select i).CountAsync();
                    var treturn = await (from r in _ctx.BookIssuereturn
                                         where r.Status == true
                                         select r).CountAsync();

                    summary = new vmSummary()
                    {
                        totalBook = tbook,
                        totalMember = tmember,
                        totalIssued = tissued,
                        totalReturned = treturn
                    };
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return summary;
        }
    }
}
