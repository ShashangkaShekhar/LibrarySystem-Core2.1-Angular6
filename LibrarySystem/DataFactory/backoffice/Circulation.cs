using DataModels.EntityModels;
using DataModels.ViewModels;
using DataUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.backoffice
{
    public class Circulation
    {
        private LibraryDBContext _ctx = null;

        public Circulation()
        {
            _ctx = new LibraryDBContext();
        }

        #region --Return
        public async Task<List<vmBookIssuereturn>> getreturnall()
        {
            List<vmBookIssuereturn> bookreturned = null;

            try
            {
                using (_ctx)
                {
                    bookreturned = await (from bk in _ctx.BookIssuereturn
                                          join us in _ctx.User on bk.Issueto equals us.Id
                                          where bk.Status == true
                                          select new vmBookIssuereturn
                                          {
                                              Id = bk.Id,
                                              Membername = us.Firstname,
                                              Issuedate = Convert.ToDateTime(bk.Issuedate).ToString(StaticInfos.GlobalDateFormat),
                                              Returndate = Convert.ToDateTime(bk.Returndate).ToString(StaticInfos.GlobalDateFormat),
                                              Duedate = Convert.ToDateTime(bk.Duedate).ToString(StaticInfos.GlobalDateFormat)

                                          }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return bookreturned;
        }

        public async Task<vmBookIssuereturn> getreturnbyid(int id)
        {
            vmBookIssuereturn bookdue = null;

            try
            {
                using (_ctx)
                {
                    bookdue = await (from bk in _ctx.BookIssuereturn
                                     join us in _ctx.User on bk.Issueto equals us.Id
                                     where bk.Issueto == id && bk.Status == false
                                     select new vmBookIssuereturn
                                     {
                                         Id = bk.Id,
                                         Membername = us.Firstname,
                                         Duedate = Convert.ToDateTime(bk.Duedate).ToString(StaticInfos.GlobalDateFormat),
                                         Books = (from bd in _ctx.BookIssuereturndetails
                                                  join bo in _ctx.Book on bd.Bookid equals bo.Id
                                                  where bd.Issueid == bk.Id
                                                  select new Book
                                                  {
                                                      Bookid = bd.Bookid,
                                                      Bookname = bo.Bookname
                                                  }).ToList()

                                     }).FirstOrDefaultAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return bookdue;
        }

        public async Task<string> returnbook(vmBookIssuereturn model)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.Id > 0)
                        {
                            //Update Author
                            var entityUpdate = _ctx.BookIssuereturn.FirstOrDefault(x => x.Id == model.Id && x.Status == false);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Status = true;
                                entityUpdate.Returndate = DateTime.Now;
                                await _ctx.SaveChangesAsync();
                            }
                        }

                        _ctxTransaction.Commit();
                        message = MessageConstants.Saved;
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        e.ToString();
                        message = MessageConstants.SavedWarning;
                    }
                }
            }

            return message;
        }
        #endregion

        #region --Issue
        public async Task<List<vmBookIssuereturn>> getissueall()
        {
            List<vmBookIssuereturn> bookissueed = null;

            try
            {
                using (_ctx)
                {
                    bookissueed = await (from bk in _ctx.BookIssuereturn
                                         join us in _ctx.User on bk.Issueto equals us.Id
                                         where bk.Status == false
                                         select new vmBookIssuereturn
                                         {
                                             Id = bk.Id,
                                             Membername = us.Firstname,
                                             Issuedate = Convert.ToDateTime(bk.Issuedate).ToString(StaticInfos.GlobalDateFormat),
                                             Returndate = Convert.ToDateTime(bk.Returndate).ToString(StaticInfos.GlobalDateFormat),
                                             Duedate = Convert.ToDateTime(bk.Duedate).ToString(StaticInfos.GlobalDateFormat)
                                         }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return bookissueed;
        }

        public async Task<vmBookIssuereturn> getissuebyid(int id)
        {
            vmBookIssuereturn bookIssue = null;

            try
            {
                using (_ctx)
                {
                    bookIssue = await (from us in _ctx.User
                                       where us.Id == id
                                       select new vmBookIssuereturn
                                       {
                                           Memberid = us.Id,
                                           Membername = us.Firstname,
                                           Email = us.Email,
                                           Duedate = DateTime.Now.AddDays(15).ToString(StaticInfos.GlobalDateFormat),
                                           Books = (from bd in _ctx.BookIssuereturndetails
                                                    join bo in _ctx.Book on bd.Bookid equals bo.Id
                                                    join bi in _ctx.BookIssuereturn on bd.Issueid equals bi.Id
                                                    where bi.Issueto == id && bi.Status == false
                                                    select new Book
                                                    {
                                                        Bookid = bd.Bookid,
                                                        Bookname = bo.Bookname
                                                    }).ToList()
                                       }).FirstOrDefaultAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return bookIssue;
        }

        public async Task<List<vmBook>> getallbook()
        {
            List<vmBook> books = null;

            try
            {
                using (_ctx)
                {
                    books = await (from bk in _ctx.Book
                                   join ct in _ctx.Category on bk.Category equals ct.Id
                                   join at in _ctx.Author on bk.Authorid equals at.Id
                                   select new vmBook
                                   {
                                       Id = bk.Id,
                                       Bookname = bk.Bookname,
                                       Categoryname = ct.Categoryname,
                                       Authorname = at.Authorname,
                                       Coverimage = bk.Coverimage
                                   }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return books;
        }

        public async Task<string> issuebook(vmBookIssuereturn model)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var entityUpdate = _ctx.BookIssuereturn.FirstOrDefault(x => x.Issueto == model.Memberid && x.Status == false);
                        if (entityUpdate == null)
                        {
                            var maxId = _ctx.BookIssuereturn.DefaultIfEmpty().Max(x => x == null ? 0 : x.Id) + 1;

                            //Save Master
                            var BookModel = new BookIssuereturn
                            {
                                Id = maxId,
                                Issueid = maxId,
                                Issueto = model.Memberid,
                                Issuedate = DateTime.Now,
                                Duedate = Convert.ToDateTime(model.Duedate),
                                Status = false
                            };

                            _ctx.BookIssuereturn.Add(BookModel);

                            //Save Details
                            var listBook = new List<BookIssuereturndetails>();
                            var maxDtId = _ctx.BookIssuereturndetails.DefaultIfEmpty().Max(x => x == null ? 0 : x.Id) + 1;
                            foreach (var item in model.Books)
                            {
                                var BookDetailsModel = new BookIssuereturndetails
                                {
                                    Id = maxDtId,
                                    Issueid = maxId,
                                    Bookid = item.Id
                                };
                                listBook.Add(BookDetailsModel);
                                maxDtId++;
                            }

                            _ctx.BookIssuereturndetails.AddRange(listBook);

                            await _ctx.SaveChangesAsync();
                            message = MessageConstants.Saved;
                        }
                        else
                        {
                            message = MessageConstants.Exist;
                        }
                        _ctxTransaction.Commit();

                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        e.ToString();
                        message = MessageConstants.SavedWarning;
                    }
                }
            }

            return message;
        }
        #endregion
    }
}
