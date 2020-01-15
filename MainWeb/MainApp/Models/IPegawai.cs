using System;

namespace MainApp.Models.Data {

     public interface IPegawai {
          int idpegawai { get; set; }

          int iduser { get; set; }

          int idjabatan { get; set; }

          string nip { get; set; }

          string nama { get; set; }

          string pangkat { get; set; }

          DateTime tmt { get; set; }

          string unitorganisasi { get; set; }

     }
}