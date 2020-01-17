using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using MainApp.Helpers;
using MainApp.Models;
using MainApp.Models.Data;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace MainApp.Services {
    public interface IUserService {
        User Authenticate (string username, string password);
        User RegisterPNS (Pegawai model);
    }

    public class UserService : IUserService {

        private readonly AppSettings _appSettings;

        public UserService (IOptions<AppSettings> appSettings) {
            _appSettings = appSettings.Value;
        }

        public User Authenticate (string username, string password) {
            try {
                using (var db = new OcphDbContext (_appSettings)) {
                    var user = db.User.Where (x => x.username == username && x.password == password).FirstOrDefault ();

                    //var user = _users.SingleOrDefault(x => x.Username == username && x.Password == password);

                    // return null if user not found
                    if (user == null) {
                        RegisterAdmin (db);
                        throw new SystemException ("Anda Tidak Memiliki Akses");
                    }

                    if (!user.aktif)
                        throw new SystemException ("Menunggu Verifikasi Data Pegawai");

                    // authentication successful so generate jwt token

                    user.Roles = (from a in db.UsersinRole.Where (x => x.iduser == user.iduser) join b in db.Roles.Select () on a.idrole equals b.idrole select b.rolename).ToList ();
                    user.token = user.GenerateToken (_appSettings.Secret);
                    return user;
                }
            } catch (System.Exception ex) {

                throw new SystemException (ex.Message);
            }
        }

        private Task RegisterAdmin (OcphDbContext db) {
            var transaction = db.BeginTransaction ();
            try {

                var users = db.User.Select ();
                if (users.Count () <= 0) {

                    string[] roles = { "admin", "pegawai", "atasan", "pejabat" };
                    foreach (var item in roles) {
                        db.Roles.Insert (new Role () { rolename = item });
                    }
                    var user = new User { username = "admin", password = "admin", created = DateTime.Now, aktif = true };
                    user = user.CreateUser (db);
                    user.AddToRole (db, "admin");
                    user.Roles = (from a in db.UsersinRole.Where (x => x.iduser == user.iduser) join b in db.Roles.Select () on a.idrole equals b.idrole select b.rolename).ToList ();
                    user.token = user.GenerateToken (_appSettings.Secret);
                    transaction.Commit ();
                }
                return Task.CompletedTask;

            } catch (System.Exception) {
                transaction.Rollback ();
                return Task.CompletedTask;
            }
        }

        public User RegisterPNS (Pegawai model) {

            using (var db = new OcphDbContext (_appSettings)) {
                var transaction = db.BeginTransaction ();
                try {
                    var user = new User { username = model.nip, password = model.password, created = DateTime.Now, aktif = false };
                    user = user.CreateUser (db);
                    user.AddToRole (db, "pegawai");
                    user.Roles = (from a in db.UsersinRole.Where (x => x.iduser == user.iduser) join b in db.Roles.Select () on a.idrole equals b.idrole select b.rolename).ToList ();
                    user.token = user.GenerateToken (_appSettings.Secret);
                    model.iduser = user.iduser;
                    var pns = db.Pegawai.InsertAndGetLastID (model);
                    transaction.Commit ();
                    return user;

                } catch (System.Exception ex) {
                    transaction.Rollback ();
                    throw new SystemException (ex.Message);
                }

            }
        }

    }

    public static class UserExtention {

        public static User CreateUser (this User user, OcphDbContext db) {
            user.iduser = db.User.InsertAndGetLastID (user);
            return user;
        }

        public static User GetDataUser (this System.Security.Claims.ClaimsPrincipal user, OcphDbContext db) {
            var claim = user.Claims.Where (x => x.Type == ClaimTypes.NameIdentifier).FirstOrDefault ();
            var result = db.User.Where (x => x.username == claim.Value).FirstOrDefault ();
            return result;
        }

        public static Pegawai GetProfile (this System.Security.Claims.ClaimsPrincipal user, OcphDbContext db) {
            var claim = user.Claims.Where (x => x.Type == ClaimTypes.NameIdentifier).FirstOrDefault ();
            var result = db.User.Where (x => x.username == claim.Value).FirstOrDefault ();
            var pegawai = from a in db.Pegawai.Where (x => x.iduser == result.iduser)
            join b in db.Jabatan.Select () on a.idjabatan equals b.idjabatan select new Pegawai {
                idjabatan = a.idjabatan, idpegawai = a.idpegawai, iduser = a.iduser, jabatan = b, nama = a.nama, nip = a.nip, pangkat = a.pangkat,
                status = a.status, tmt = a.tmt, unitorganisasi = a.unitorganisasi
            };
            return pegawai.FirstOrDefault ();
        }

        public static bool AddToRole (this User user, OcphDbContext db, string roleName) {
            var role = db.Roles.Where (item => item.rolename == roleName).FirstOrDefault ();
            if (role != null) {
                return db.UsersinRole.Insert (new Userinrole { iduser = user.iduser, idrole = role.idrole });
            }
            return false;
        }

        public static string GenerateToken (this User user, string secretCode) {
            var claims = new List<Claim> {
                new Claim (JwtRegisteredClaimNames.Sub, user.username),
                new Claim (JwtRegisteredClaimNames.Jti, Guid.NewGuid ().ToString ()),
                new Claim (JwtRegisteredClaimNames.NameId, user.iduser.ToString ()),
                new Claim (ClaimTypes.NameIdentifier, user.iduser.ToString ())
            };

            var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (secretCode));
            var creds = new SigningCredentials (key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays (Convert.ToDouble (7));

            var token = new JwtSecurityToken (
                secretCode,
                secretCode,
                claims,
                expires : expires,
                signingCredentials : creds
            );

            return new JwtSecurityTokenHandler ().WriteToken (token);
        }
    }

}