using DataFactory.backoffice;
using DataModels.EntityModels;
using DataModels.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace LibraryMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class bookController : ControllerBase
    {
        private Books _objbook = null;
        private IHostingEnvironment _hostingEnvironment;

        public bookController(IHostingEnvironment env)
        {
            _hostingEnvironment = env;
        }

        // GET: api/book/getall
        [HttpGet("[action]")]
        public async Task<List<vmBook>> getall()
        {
            List<vmBook> books = null;
            try
            {
                _objbook = new Books();
                books = await _objbook.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return books;
        }

        // GET api/book/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<Book> getbyid(int id)
        {
            Book book = null;
            try
            {
                _objbook = new Books();
                book = await _objbook.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return book;
        }

        // POST: api/book/save
        [HttpPost("[action]")]
        public async Task<object> save()
        {
            object result = null; string message = string.Empty;
            try
            {
                string serverPath = string.Empty;
                var totalfile = Request.Form.Files.Count;
                if (totalfile > 0)
                {
                    var file = Request.Form.Files[0];
                    string folderName = "uploads";
                    string webRootPath = _hostingEnvironment.WebRootPath;
                    string newPath = Path.Combine(webRootPath, folderName);

                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                    }
                    if (file.Length > 0)
                    {
                        string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        string fullPath = Path.Combine(newPath, fileName);
                        serverPath = folderName + "/" + fileName;
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                }

                //Save
                Book model = new Book()
                {
                    Id = Convert.ToInt32(Request.Form["id"]),
                    Bookname = Request.Form["bookName"].ToString(),
                    Authorid = Convert.ToInt32(Request.Form["authorId"]),
                    Category = Convert.ToInt32(Request.Form["category"]),
                    Description = Request.Form["description"].ToString(),
                    Coverimage = serverPath
                };

                _objbook = new Books();
                message = await _objbook.create(model);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                message
            };

            return result;
        }

        // DELETE api/book/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objbook = new Books();
                message = await _objbook.deletebyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            result = new
            {
                message
            };

            return result;
        }
    }
}