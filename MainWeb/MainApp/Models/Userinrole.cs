using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace MainApp.Models.Data  
{ 
     [TableName("Userinrole")] 
     public class Userinrole :IUserinrole  
   {
          [DbColumn("idrole")] 
          public int idrole {  get; set;} 

          [DbColumn("iduser")] 
          public int iduser {  get; set;} 

     }
}


