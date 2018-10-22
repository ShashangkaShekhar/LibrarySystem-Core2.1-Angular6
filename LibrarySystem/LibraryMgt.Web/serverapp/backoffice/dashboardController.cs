using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataFactory.backoffice;
using DataModels.EntityModels;
using DataModels.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryMgt.Web.serverapp.backoffice
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class dashboardController : ControllerBase
    {
        private Dashboard _objdashboard = null;

        // GET: api/dashboard/getallsummary
        [HttpGet("[action]")]
        public async Task<vmSummary> getallsummary()
        {
            vmSummary summary = null;
            try
            {
                _objdashboard = new Dashboard();
                summary = await _objdashboard.getallsummary();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return summary;
        }
    }
}