using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace OpenPOReport.Models
{
    public class OpenPOinputmodel
    {
        public string materialnum { get; set; }
        public string ponum { get; set; }
        public string pripbg { get; set; }
        public string plantcd { get; set; }
        public string potype { get; set; }
        public string plannername { get; set; }
        public string plannermanager { get; set; }
        public string plannerdirector { get; set; }
        public string suppliersitename { get; set; }
        public string ParentSupplierName { get; set; }
    }
    public class OpenPOoutputmodel
    {
        
        public string OutputData { get; set; }


        public string getDataFromDB(string query, string where)
        {
            string strcon = ConfigurationManager.ConnectionStrings["gsca_appsEntities"].ConnectionString;
            SqlConnection con = new SqlConnection(strcon);
            SqlCommand cmd = new SqlCommand(query + where, con);
            cmd.CommandTimeout = 300;
            SqlDataAdapter customerDA = new SqlDataAdapter();
            customerDA.SelectCommand = cmd;
            con.Open();
            DataTable dt = new DataTable();

            customerDA.Fill(dt);
            con.Close();
            var rowcounts = dt.Rows.Count;
            string JsonString = string.Empty;
            JsonString = JsonConvert.SerializeObject(dt);
            return JsonString;
        }
    }
}