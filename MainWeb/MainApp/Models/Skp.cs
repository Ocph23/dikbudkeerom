using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;

namespace MainApp.Models.Data {
     [TableName ("Skp")]
     public class Skp : ISkp {

          [PrimaryKey ("idskp")]
          [DbColumn ("idskp")]
          public int idskp { get; set; }

          [DbColumn ("idperiode")]
          public int idperiode { get; set; }

          [DbColumn ("idpegawai")]
          public int idpegawai { get; set; }

          [DbColumn ("idpejabatpenilai")]
          public int idpejabatpenilai { get; set; }

          [DbColumn ("tanggal")]
          public DateTime tanggal { get; set; }

          [DbColumn ("idjabatan")]
          public int idjabatan { get; set; }

          [DbColumn ("idatasanpejabat")]
          public int idatasanpejabat { get; set; }

          [DbColumn ("persetujuanatasan")]
          public bool persetujuanatasan { get; set; }

          [DbColumn ("persetujuanpenilai")]
          public bool persetujuanpenilai { get; set; }

          [DbColumn ("keberatanpegawai")]
          public string keberatanpegawai { get; set; }

          [DbColumn ("keberatanpenilai")]
          public string keberatanpenilai { get; set; }

          [DbColumn ("keberatanatasan")]
          public string keberatanatasan { get; set; }

          ///
          public Periode periode { get; set; }
          public Pegawai pejabat { get; set; }
          public Pegawai AtasanPejabatPenilai { get; set; }
          public Pegawai PejabatPenilai { get; set; }
          public Pegawai Pegawai { get; set; }
     }
}