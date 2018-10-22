using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataFactory.backoffice;
using DataModels.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class reportController : ControllerBase
    {
        private Report _objchart = null;

        // GET: api/report/getbookchart
        [HttpGet("[action]")]
        public async Task<List<vmBookchart>> getbookchart()
        {
            List<vmBookchart> bchart = null;
            try
            {
                _objchart = new Report();
                bchart = await _objchart.getbookchart();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return bchart;
        }

        // GET: api/report/getmemberchart
        [HttpGet("[action]")]
        public async Task<List<vmMemberchart>> getmemberchart()
        {
            List<vmMemberchart> mchart = null;
            try
            {
                _objchart = new Report();
                mchart = await _objchart.getmemberchart();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return mchart;
        }
    }
}