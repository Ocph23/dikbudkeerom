using System;

namespace MainApp.Models.Data {

     public interface IJabatan {
          int idjabatan { get; set; }

          string nama { get; set; }

          JenisJabatan jenis { get; set; }

     }
}