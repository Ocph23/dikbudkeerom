using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace MainApp.Models.Data  
{ 
     [TableName("Role")] 
     public class Role :IRole  
   {
          [PrimaryKey("idrole")] 
          [DbColumn("idrole")] 
          public int idrole {  get; set;} 

          [DbColumn("rolename")] 
          public string rolename {  get; set;} 

     }
}


