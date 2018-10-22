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
    public class usersController : ControllerBase
    {
        private Users _objusers = null;

        // GET: api/users/getall
        [HttpGet("[action]")]
        public async Task<List<User>> getall()
        {
            List<User> users = null;
            try
            {
                _objusers = new Users();
                users = await _objusers.getall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return users;
        }

        // GET api/users/getbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<User> getbyid(int id)
        {
            User user = null;
            try
            {
                _objusers = new Users();
                user = await _objusers.getbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return user;
        }

        // POST: api/users/save
        [HttpPost("[action]")]
        public async Task<object> save([FromBody]User model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objusers = new Users();
                message = await _objusers.create(model);
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

        // DELETE api/users/deletebyid/1
        [HttpDelete("[action]/{id}")]
        public async Task<object> deletebyid(int id)
        {
            object result = null; string message = string.Empty;
            try
            {
                _objusers = new Users();
                message = await _objusers.deletebyid(id);
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