using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace MainApp.Models.Data  
{ 
     [TableName("Nilaiperilaku")] 
     public class Nilaiperilaku :INilaiperilaku  
   {
          [PrimaryKey("idnilaiperilaku")] 
          [DbColumn("idnilaiperilaku")] 
          public int idnilaiperilaku {  get; set;} 

          [DbColumn("idperilaku")] 
          public int idperilaku {  get; set;} 

          [DbColumn("nilai")] 
          public double nilai {  get; set;} 

          [DbColumn("idskp")] 
          public int idskp {  get; set;} 

     }
}


