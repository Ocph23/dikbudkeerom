using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;

namespace MainApp.Models.Data {
     [TableName ("targetskp")]
     public class Targetskp : ITargetskp {

          [PrimaryKey ("idtargetskp")]
          [DbColumn ("idtargetskp")]
          public int idtargetskp { get; set; }

          [DbColumn ("idskp")]
          public int idskp { get; set; }

          [DbColumn ("kegiatan")]
          public string kegiatan { get; set; }

          [DbColumn ("kuantitas")]
          public int kuantitas { get; set; }

          [DbColumn ("kualitas")]
          public double kualitas { get; set; }

          [DbColumn ("waktu")]
          public int waktu { get; set; }

          [DbColumn ("biaya")]
          public double biaya { get; set; }

          [DbColumn ("jenis")]
          public string jenis { get; set; }

          [DbColumn ("idsatuankerja")]
          public int idsatuankerja { get; set; }
          public Realisasiskp Realisasi { get; set; }
          public double bobot { get; set; }

          public double total {
               get { if (_total <= 0) _total = getTotal (); return _total; }
               set { _total = value; }
          }

          private double getTotal () {
               if (Realisasi != null && Realisasi.idrealisasiskp > 0) {
                    double xkuantitas = Realisasi.kuantitas / kuantitas * 100;
                    double xkualitas = Realisasi.kualitas / kualitas * 100;
                    double xwaktu = (1.76 * waktu - Realisasi.waktu) / waktu * 100;
                    double xbiaya = (1.76 * biaya - Realisasi.biaya) / biaya * 100;
                    double xxbiaya = Double.IsNaN (xbiaya) ? 0 : xbiaya;
                    return xkuantitas + xkualitas + xwaktu + xxbiaya;
               }
               return 0;

          }

          public double capaian {
               get {
                    if (_capaian <= 0) {
                         if (total > 0) {
                              _capaian = biaya <= 0 ? total / 3 : total / 4;
                         }
                    }
                    return _capaian;
               }
               set {
                    _capaian = value;
               }
          }

          private double _total;
          private double _capaian;

     }
}