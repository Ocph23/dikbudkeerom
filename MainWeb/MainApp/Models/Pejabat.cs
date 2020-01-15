using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;

namespace MainApp.Models.Data {
     [TableName ("Pejabat")]
     public class Pejabat : IPejabat {
          [PrimaryKey ("idpejabat")]
          [DbColumn ("idpejabat")]
          public int idpejabat { get; set; }

          [DbColumn ("idpegawai")]
          public int idpegawai { get; set; }
          public Pegawai Pegawai { get; set; }
          public Jabatan Jabatan { get; set; }
     }
}