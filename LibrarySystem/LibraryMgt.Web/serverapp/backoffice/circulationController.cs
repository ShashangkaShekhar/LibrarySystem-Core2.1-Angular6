using DataFactory.backoffice;
using DataModels.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class circulationController : ControllerBase
    {
        private Circulation _objcirculation = null;

        #region --Return
        // GET: api/circulation/getreturnall
        [HttpGet("[action]")]
        public async Task<List<vmBookIssuereturn>> getreturnall()
        {
            List<vmBookIssuereturn> bookIssuereturn = null;
            try
            {
                _objcirculation = new Circulation();
                bookIssuereturn = await _objcirculation.getreturnall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return bookIssuereturn;
        }

        // GET api/circulation/getreturnbyid/1
        [HttpGet("[action]/{id}")]
        public async Task<vmBookIssuereturn> getreturnbyid(int id)
        {
            vmBookIssuereturn bookIssuereturn = null;
            try
            {
                _objcirculation = new Circulation();
                bookIssuereturn = await _objcirculation.getreturnbyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return bookIssuereturn;
        }

        // POST: api/circulation/returnbook
        [HttpPost("[action]")]
        public async Task<object> returnbook([FromBody] vmBookIssuereturn model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                //Save
                _objcirculation = new Circulation();
                message = await _objcirculation.returnbook(model);
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
        #endregion


        #region --Issue
        // GET: api/circulation/getissueall
        [HttpGet("[action]")]
        public async Task<List<vmBookIssuereturn>> getissueall()
        {
            List<vmBookIssuereturn> bookIssueissue = null;
            try
            {
                _objcirculation = new Circulation();
                bookIssueissue = await _objcirculation.getissueall();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return bookIssueissue;
        }

        // GET api/circulation/getissuebyid/1
        [HttpGet("[action]/{id}")]
        public async Task<vmBookIssuereturn> getissuebyid(int id)
        {
            vmBookIssuereturn bookIssueissue = null;
            try
            {
                _objcirculation = new Circulation();
                bookIssueissue = await _objcirculation.getissuebyid(id);
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return bookIssueissue;
        }

        // GET: api/circulation/getallbook
        [HttpGet("[action]")]
        public async Task<List<vmBook>> getallbook()
        {
            List<vmBook> books = null;
            try
            {
                _objcirculation = new Circulation();
                books = await _objcirculation.getallbook();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return books;
        }

        // POST: api/circulation/issuebook
        [HttpPost("[action]")]
        public async Task<object> issuebook([FromBody] object model)
        {
            object result = null; string message = string.Empty;
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                var bookIssued = JsonConvert.DeserializeObject<vmBookIssuereturn>(model.ToString());

                //Save
                _objcirculation = new Circulation();
                message = await _objcirculation.issuebook(bookIssued);
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
        #endregion
    }
}