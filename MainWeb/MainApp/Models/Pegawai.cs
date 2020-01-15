using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;

namespace MainApp.Models.Data {
     [TableName ("Pegawai")]
     public class Pegawai : IPegawai {
          [PrimaryKey ("idpegawai")]
          [DbColumn ("idpegawai")]
          public int idpegawai { get; set; }

          [DbColumn ("iduser")]
          public int iduser { get; set; }

          [DbColumn ("idjabatan")]
          public int idjabatan { get; set; }

          [DbColumn ("nip")]
          public string nip { get; set; }

          [DbColumn ("nama")]
          public string nama { get; set; }

          [DbColumn ("pangkat")]
          public string pangkat { get; set; }

          [DbColumn ("tmt")]
          public DateTime tmt { get; set; }

          [DbColumn ("unitorganisasi")]
          public string unitorganisasi { get; set; }
          public string password { get; set; }
          public Jabatan jabatan { get; set; }
          public bool status { get; set; }
     }
}