using Newtonsoft.Json;
using OpenPOReport.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;


namespace OpenPOReport.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}


        // GET api/values/5
        public string Get(int id)
        {
            OpenPOoutputmodel model = new OpenPOoutputmodel();
            var str = "";

            var query = "";


            if (id == 1)
            {
                str = HttpContext.Current.Request.LogonUserIdentity.Name.ToString();


                query = "dbo.usp_gscobi_app_assitant  '" + str + "','login'";
            }

            if (id == 2)
            {
                str = HttpContext.Current.Request.LogonUserIdentity.Name.ToString();
                str = str.Replace("AMAT\\", "");
                query = "insert into  [GSCA_APPS].[dbo].[gscobi_apps_users_access_log] values ('" + str + "','OpenPoReport',GETDATE())";
            }
            if (id == 3)
            {
                str = HttpContext.Current.Request.LogonUserIdentity.Name.ToString();
                str = str.Replace("AMAT\\", "");
                query = "select EMPLOYEE_NTID, Favouriteslist from [dbo].[gscobi_apps_users_favourites_list] where [EMPLOYEE_NTID]='" + str + "' and [APPLICATION_NAME] = 'OpenPoReport'";
            }
            if (id == 4)
            {
                
                query = "select max(extractdate) as refreshdate from dbo.open_pos";
            }



            return model.getDataFromDB(query, " "); ;
        }

        
        public OpenPOinputmodel Get()
        {


            OpenPOoutputmodel result = new OpenPOoutputmodel();
            OpenPOinputmodel input = new OpenPOinputmodel();
            DataTable dt = new DataTable();
            string JsonString = string.Empty;
            JsonString = JsonConvert.SerializeObject(dt);
            input.pripbg= result.getDataFromDB("exec helper.uSP_open_po_inputs 'pripbg' ", " ");
            input.plantcd = result.getDataFromDB("exec helper.uSP_open_po_inputs 'plantcd'", " ");

            input.potype = result.getDataFromDB("exec helper.uSP_open_po_inputs 'potype'", " ");
            input.plannername = result.getDataFromDB("exec helper.uSP_open_po_inputs 'plannername'", " ");
            input.plannermanager = result.getDataFromDB("exec helper.uSP_open_po_inputs 'plannermanager'", " ");
            input.plannerdirector = result.getDataFromDB("exec helper.uSP_open_po_inputs 'plannerdirector'", " ");
            input.suppliersitename = result.getDataFromDB("exec helper.uSP_open_po_inputs 'suppliersitename'", " ");
            input.ParentSupplierName = result.getDataFromDB("exec helper.uSP_open_po_inputs 'ParentSupplierName'", " ");

            return input;

        }
        public OpenPOoutputmodel Post(OpenPOinputmodel model)
        {

            string plantcd = model.plantcd;
            OpenPOoutputmodel result = new OpenPOoutputmodel();
            DataTable dt = new DataTable();
            string JsonString = string.Empty;
            JsonString = JsonConvert.SerializeObject(dt);

            result.OutputData = result.getDataFromDB("EXEC [helper].[uSP_Open_PO_Report_Data]  '" + model.materialnum + "','" + model.ponum + "','" + plantcd + "','" + model.pripbg + "','" + model.potype  + "','" + model.plannername + "','" + model.plannermanager + "','" + model.plannerdirector +"','" + model.suppliersitename + "','" + model.ParentSupplierName + "'", " ");


            return result;

        }
    }
}
