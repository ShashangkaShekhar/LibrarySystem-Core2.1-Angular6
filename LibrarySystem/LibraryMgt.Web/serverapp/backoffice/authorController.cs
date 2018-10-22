using DataFactory.backoffice;
using DataModels.EntityModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class authorController : ControllerBase
    {
        private Authors _objauthor = null;

        // GET: api/author/getall
        [HttpGet("[action]")]
        public async Task<List<Author>> getall()
        {
            List<Author> authors = null;
            try
            {
                _objauthor = new Authors();
                authors = await _objauthor.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return authors;
        }

        // GET api/author/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<Author> getbyid(int id)
        {
            Author author = null;
            try
            {
                _objauthor = new Authors();
                author = await _objauthor.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return author;
        }

        // POST: api/author/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Author model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objauthor = new Authors();
                message = await _objauthor.create(model);
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

        // DELETE api/author/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objauthor = new Authors();
                message = await _objauthor.deletebyid(id);
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