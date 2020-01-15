using System.Linq;
using MainApp.Helpers;
using MainApp.Models.Data;

namespace MainApp {
    public class UserManager {

        public static User GetUserByUserName (string username, AppSettings _dbsetting) {
            using (var db = new OcphDbContext (_dbsetting)) {
                var user = db.User.Where (x => x.username == username).FirstOrDefault ();
                return user;
            }
        }
        public static User GetUserByUserId (int id, AppSettings _dbsetting) {
            using (var db = new OcphDbContext (_dbsetting)) {
                var user = db.User.Where (x => x.iduser == id).FirstOrDefault ();
                return user;
            }
        }
    }
}