using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataFactory.backoffice;
using DataModels.EntityModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class categoryController : ControllerBase
    {
        private Categories _objcateg = null;

        // GET: api/category/getall
        [HttpGet("[action]")]
        public async Task<List<Category>> getall()
        {
            List<Category> categories = null;
            try
            {
                _objcateg = new Categories();
                categories = await _objcateg.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return categories;
        }

        // GET api/category/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<Category> getbyid(int id)
        {
            Category category = null;
            try
            {
                _objcateg = new Categories();
                category = await _objcateg.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return category;
        }

        // POST: api/category/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]Category model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objcateg = new Categories();
                message = await _objcateg.create(model);
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

        // DELETE api/category/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objcateg = new Categories();
                message = await _objcateg.deletebyid(id);
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