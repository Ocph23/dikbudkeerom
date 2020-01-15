using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MainApp.Models.Data;
using Ocph.DAL.Provider.MySql;
using Ocph.DAL.Repository;

namespace MainApp {
    public class OcphDbContext : MySqlDbConnection, IDisposable {
        public OcphDbContext (Helpers.AppSettings _appSettings) : base (_appSettings.ConnectionString) {

        }

        public IRepository<User> User { get { return new Repository<User> (this); } }
        public IRepository<Role> Roles { get { return new Repository<Role> (this); } }
        public IRepository<Userinrole> UsersinRole { get { return new Repository<Userinrole> (this); } }
        public IRepository<Pegawai> Pegawai { get { return new Repository<Pegawai> (this); } }
        public IRepository<Pejabat> PejabatPenilai { get { return new Repository<Pejabat> (this); } }
        public IRepository<Targetskp> Kegiatan { get { return new Repository<Targetskp> (this); } }
        public IRepository<Perilakukerja> Perilaku { get { return new Repository<Perilakukerja> (this); } }
        public IRepository<Periode> Periode { get { return new Repository<Periode> (this); } }
        public IRepository<Skp> SKP { get { return new Repository<Skp> (this); } }
        public IRepository<Targetskp> TargetSKP { get { return new Repository<Targetskp> (this); } }
        public IRepository<Realisasiskp> Realisasi { get { return new Repository<Realisasiskp> (this); } }
        public IRepository<Nilaiperilaku> NilaiPerilaku { get { return new Repository<Nilaiperilaku> (this); } }
        public IRepository<Perilakukerja> PerilakuKerja { get { return new Repository<Perilakukerja> (this); } }
        public IRepository<Jabatan> Jabatan { get { return new Repository<Jabatan> (this); } }
        public IRepository<Satuankerja> SatuanKerja { get { return new Repository<Satuankerja> (this); } }
        new void Dispose () {
            this.Close ();
        }
    }
}