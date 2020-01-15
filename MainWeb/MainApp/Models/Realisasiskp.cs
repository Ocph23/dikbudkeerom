using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;

namespace MainApp.Models.Data {
     [TableName ("Realisasiskp")]
     public class Realisasiskp : IRealisasiskp {
          [PrimaryKey ("idrealisasiskp")]
          [DbColumn ("idrealisasiskp")]
          public int idrealisasiskp { get; set; }

          [DbColumn ("idtargetskp")]
          public int idtargetskp { get; set; }

          [DbColumn ("kuantitas")]
          public int kuantitas { get; set; }

          [DbColumn ("kualitas")]
          public double kualitas { get; set; }

          [DbColumn ("biaya")]
          public double biaya { get; set; }

          [DbColumn ("waktu")]
          public int waktu { get; set; }

     }
}