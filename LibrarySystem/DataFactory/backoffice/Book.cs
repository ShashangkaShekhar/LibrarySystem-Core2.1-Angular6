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
    public class Books
    {
        private LibraryDBContext _ctx = null;

        public Books()
        {
            _ctx = new LibraryDBContext();
        }

        public async Task<List<vmBook>> getall()
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

        public async Task<Book> getbyid(int id)
        {
            Book book = null;

            try
            {
                using (_ctx)
                {
                    book = await _ctx.Book.FirstOrDefaultAsync(x => x.Id == id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return book;
        }

        public async Task<string> create(Book model)
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
                            var entityUpdate = _ctx.Book.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Bookname = model.Bookname;
                                entityUpdate.Authorid = model.Authorid;
                                entityUpdate.Category = model.Category;
                                entityUpdate.Description = model.Description;
                                entityUpdate.Coverimage = model.Coverimage;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            var maxId = _ctx.Book.DefaultIfEmpty().Max(x => x == null ? 0 : x.Id) + 1;

                            //Save Book
                            var BookModel = new Book
                            {
                                Id = maxId,
                                Bookname = model.Bookname,
                                Authorid = model.Authorid,
                                Category = model.Category,
                                Description = model.Description,
                                Coverimage = model.Coverimage
                            };
                            _ctx.Book.Add(BookModel);
                            await _ctx.SaveChangesAsync();
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

        public async Task<string> deletebyid(int id)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _ctx.Book.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.Book.Remove(idToRemove);
                            await _ctx.SaveChangesAsync();
                        }
                        _ctxTransaction.Commit();
                        message = MessageConstants.Deleted;
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        e.ToString();
                        message = MessageConstants.DeletedWarning;
                    }
                }
            }

            return message;
        }
    }
}
