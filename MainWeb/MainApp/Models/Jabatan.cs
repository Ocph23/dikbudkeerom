using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Ocph.DAL;

namespace MainApp.Models.Data {
     [TableName ("Jabatan")]
     public class Jabatan : IJabatan {
          [PrimaryKey ("idjabatan")]
          [DbColumn ("idjabatan")]
          public int idjabatan { get; set; }

          [DbColumn ("nama")]
          public string nama { get; set; }

          [DbColumn ("jenis")]
          [JsonConverter (typeof (StringEnumConverter))]
          public JenisJabatan jenis { get; set; }

     }
}