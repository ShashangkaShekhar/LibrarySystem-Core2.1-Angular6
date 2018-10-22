using DataModels.EntityModels;
using DataUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.backoffice
{
    public class Categories
    {
        private LibraryDBContext _ctx = null;

        public Categories()
        {
            _ctx = new LibraryDBContext();
        }

        public async Task<List<Category>> getall()
        {
            List<Category> categories = null;

            try
            {
                using (_ctx)
                {
                    categories = await _ctx.Category.ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return categories;
        }

        public async Task<Category> getbyid(int id)
        {
            Category category = null;

            try
            {
                using (_ctx)
                {
                    category = await _ctx.Category.FirstOrDefaultAsync(x => x.Id == id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return category;
        }

        public async Task<string> create(Category model)
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
                            var entityUpdate = _ctx.Category.FirstOrDefault(x => x.Id == model.Id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.Categoryname = model.Categoryname;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            var maxId = _ctx.Category.DefaultIfEmpty().Max(x => x == null ? 0 : x.Id) + 1;

                            //Save Book
                            var CategoryModel = new Category
                            {
                                Id = maxId,
                                Categoryname = model.Categoryname
                            };
                            _ctx.Category.Add(CategoryModel);
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
                        var idToRemove = _ctx.Category.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.Category.Remove(idToRemove);
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
