using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;

namespace MainApp.Models.Data {
     [TableName ("Satuankerja")]
     public class Satuankerja : ISatuankerja {
          [PrimaryKey ("idsatuankerja")]
          [DbColumn ("idsatuankerja")]
          public int idsatuankerja { get; set; }

          [DbColumn ("kegiatan")]
          public string kegiatan { get; set; }

          [DbColumn ("bobot")]
          public double bobot { get; set; }

          [DbColumn ("idjabatan")]
          public int idjabatan { get; set; }

          [DbColumn ("jenis")]
          public string jenis { get; set; }

          public string kegiatanText {
               get {
                    return $"{kegiatan} ({bobot})";
               }
          }

     }
}