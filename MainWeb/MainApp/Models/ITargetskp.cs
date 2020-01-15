using System;
 
 namespace MainApp.Models.Data  
{ 
     public interface ITargetskp  
   {
         int idtargetskp {  get; set;} 

         string kegiatan {  get; set;} 

         int kuantitas {  get; set;} 

         double kualitas {  get; set;} 

         int waktu {  get; set;} 

         double biaya {  get; set;} 

         int idskp {  get; set;} 

         string jenis {  get; set;} 

         int idsatuankerja {  get; set;} 

     }
}


