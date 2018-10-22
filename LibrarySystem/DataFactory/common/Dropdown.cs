using DataModels.EntityModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.common
{
    public class Dropdown
    {
        private LibraryDBContext _ctx = null;

        public Dropdown()
        {
            _ctx = new LibraryDBContext();
        }

        public async Task<List<Author>> getallauthor()
        {
            List<Author> authors = null;
            try
            {
                using (_ctx)
                {
                    authors = await (from au in _ctx.Author
                                     select new Author
                                     {
                                         Id = au.Id,
                                         Authorname = au.Authorname
                                     }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return authors;
        }


        public async Task<List<Category>> getallcategory()
        {
            List<Category> categories = null;
            try
            {
                using (_ctx)
                {
                    categories = await (from ct in _ctx.Category
                                        select new Category
                                        {
                                         Id = ct.Id,
                                         Categoryname = ct.Categoryname
                                        }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return categories;
        }
    }
}
