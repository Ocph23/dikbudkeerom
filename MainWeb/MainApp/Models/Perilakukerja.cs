using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;

namespace MainApp.Models.Data {
     [TableName ("Perilakukerja")]
     public class Perilakukerja : IPerilakukerja {
          [PrimaryKey ("idperilaku")]
          [DbColumn ("idperilaku")]
          public int idperilaku { get; set; }

          [DbColumn ("perilaku")]
          public string perilaku { get; set; }
          public Nilaiperilaku nilaiperilaku { get; set; }
     }
}