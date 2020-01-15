using System;

namespace MainApp.Models.Data {

     public interface IRealisasiskp {
          int idrealisasiskp { get; set; }

          int idtargetskp { get; set; }

          int kuantitas { get; set; }

          double kualitas { get; set; }

          double biaya { get; set; }

          int waktu { get; set; }

     }
}