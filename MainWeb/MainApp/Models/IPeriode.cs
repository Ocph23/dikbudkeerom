using System;

namespace MainApp.Models.Data {

     public interface IPeriode {
          int idperiode { get; set; }

          int tahun { get; set; }

          DateTime tanggalpengajuan { get; set; }

          DateTime tanggalrealisasi { get; set; }

          StatusPeriode status { get; set; }

     }
}