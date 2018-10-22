using DataModels.EntityModels;
using DataUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.backoffice
{
    public class Authors
    {
        private LibraryDBContext _ctx = null;

        public Authors()
        {
            _ctx = new LibraryDBContext();
        }

        public async Task<List<Author>> getall()
        {
            List<Author> authors = null;

            try
            {
                using (_ctx)
                {
                    authors = await _ctx.Author.ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return authors;
        }

        public async Task<Author> getbyid(int id)
        {
            Author author = null;

            try
            {
                using (_ctx)
                {
                    author = await _ctx.Author.FirstOrDefaultAsync(x => x.Id == id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return author;
        }

        public async Task<string> create(Author model)
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
                            var entityUpdate = _ctx.Author.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Authorname = model.Authorname;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            var maxId = _ctx.Author.DefaultIfEmpty().Max(x => x == null ? 0 : x.Id) + 1;

                            //Save Author
                            var AuthorModel = new Author
                            {
                                Id = maxId,
                                Authorname = model.Authorname
                            };
                            _ctx.Author.Add(AuthorModel);
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
                        var idToRemove = _ctx.Author.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.Author.Remove(idToRemove);
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
