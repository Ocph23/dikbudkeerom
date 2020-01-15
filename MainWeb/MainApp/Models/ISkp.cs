using System;

namespace MainApp.Models.Data {

     public interface ISkp {
          int idskp { get; set; }

          int idperiode { get; set; }

          int idpegawai { get; set; }

          int idpejabatpenilai { get; set; }

          DateTime tanggal { get; set; }

          int idjabatan { get; set; }

          int idatasanpejabat { get; set; }

     }
}