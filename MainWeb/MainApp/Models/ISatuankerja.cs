using System;
 
 namespace MainApp.Models.Data  
{ 
     public interface ISatuankerja  
   {
         int idsatuankerja {  get; set;} 

         string kegiatan {  get; set;} 

         double bobot {  get; set;} 

         int idjabatan {  get; set;} 

         string jenis {  get; set;} 

     }
}


