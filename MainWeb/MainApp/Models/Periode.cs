using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Ocph.DAL;

namespace MainApp.Models.Data {
     [TableName ("Periode")]
     public class Periode : IPeriode {
          [PrimaryKey ("idperiode")]
          [DbColumn ("idperiode")]
          public int idperiode { get; set; }

          [DbColumn ("tahun")]
          public int tahun { get; set; }

          [DbColumn ("tanggalpengajuan")]
          public DateTime tanggalpengajuan { get; set; }

          [DbColumn ("tanggalrealisasi")]
          public DateTime tanggalrealisasi { get; set; }

          [DbColumn ("status")]
          [JsonConverter (typeof (StringEnumConverter))]
          public StatusPeriode status { get; set; }

     }
}