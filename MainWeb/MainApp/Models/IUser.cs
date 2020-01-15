using System;
using System.Reflection.Metadata;

namespace MainApp.Models.Data {

     public interface IUser {
          int iduser { get; set; }

          string username { get; set; }

          string password { get; set; }

          string token { get; set; }

          bool aktif { get; set; }

          DateTime created { get; set; }

     }
}