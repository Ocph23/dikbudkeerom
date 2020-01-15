using System.Linq;
using MainApp.Helpers;
using MainApp.Models.Data;
using MainApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MainApp.Controllers {
    [ApiController]
    [Route ("[controller]/[action]")]
    public class PegawaiController : ControllerBase {
        private readonly AppSettings _dbsetting;
        private readonly IUserService _userService;

        public PegawaiController (IOptions<AppSettings> setting, IUserService userService) {
            _dbsetting = setting.Value;
            this._userService = userService;
        }

        [HttpGet]
        public IActionResult Get () {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = from a in db.Pegawai.Select ()
                join b in db.User.Select () on a.iduser equals b.iduser
                join c in db.Jabatan.Select () on a.idjabatan equals c.idjabatan
                select new Pegawai {
                iduser = a.iduser, idpegawai = a.idpegawai, jabatan = c, idjabatan = a.idjabatan,
                nama = a.nama, nip = a.nip, pangkat = a.pangkat, tmt = a.tmt, unitorganisasi = a.unitorganisasi, status = b.aktif
                };
                return Ok (result.ToList ());
            }
        }

        [HttpGet]
        public IActionResult GetById (int id) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = from a in db.Pegawai.Where (x => x.idpegawai == id)
                join b in db.User.Select () on a.iduser equals b.iduser
                join c in db.Jabatan.Select () on a.idjabatan equals c.idjabatan
                select new Pegawai {
                iduser = a.iduser, idpegawai = a.idpegawai, jabatan = c, idjabatan = a.idjabatan,
                nama = a.nama, nip = a.nip, pangkat = a.pangkat, tmt = a.tmt, unitorganisasi = a.unitorganisasi, status = b.aktif
                };
                return Ok (result.FirstOrDefault ());
            }
        }

        [HttpGet]
        public IActionResult GetPejabatPenilai () {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = from a in db.PejabatPenilai.Select ()
                join b in db.Pegawai.Select () on a.idpegawai equals b.idpegawai
                join c in db.Jabatan.Select () on b.idjabatan equals c.idjabatan
                select new Pejabat { idpegawai = a.idpegawai, idpejabat = a.idpejabat, Pegawai = b, Jabatan = c };
                return Ok (result);
            }
        }

        [HttpPost]
        public IActionResult verifikasi (Pegawai data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                try {
                    var updated = db.User.Update (x => new { x.aktif }, new User { aktif = !data.status }, x => x.iduser == data.iduser);
                    if (updated) {
                        return Ok (updated);
                    } else {
                        throw new System.Exception ("Verifikasi Akun Gagal");
                    }
                } catch (System.Exception ex) {
                    return BadRequest (ex.Message);
                }

            }
        }

        [Authorize]
        [HttpPost]
        public IActionResult setpejabat (Pejabat data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var trans = db.BeginTransaction ();
                try {
                    var resultId = db.PejabatPenilai.InsertAndGetLastID (data);
                    if (resultId > 0) {
                        data.idpejabat = resultId;
                        var user = UserManager.GetUserByUserId (data.Pegawai.iduser, _dbsetting);
                        user.AddToRole (db, "pejabat");
                    } else {
                        throw new System.Exception ("Pejabat Tidak Berhasil Disimpan");
                    }
                    trans.Commit ();
                    return Ok (data);
                } catch (System.Exception ex) {
                    trans.Rollback ();
                    return BadRequest (ex.Message);
                }

            }
        }

        public IActionResult pejabatGetPegawaiByPeriodeId (int id) {
            using (var db = new OcphDbContext (_dbsetting)) {
                var user = User.GetProfile (db);
                var result = from a in db.SKP.Where (x => x.idperiode == id)
                join b in db.Periode.Select () on a.idperiode equals b.idperiode join c in db.PejabatPenilai.Select () on a.idpejabatpenilai equals c.idpejabat join d in db.Pegawai.Select () on c.idpegawai equals d.idpegawai join e in db.PejabatPenilai.Select () on a.idatasanpejabat equals e.idpejabat join f in db.Pegawai.Select () on e.idpegawai equals f.idpegawai

                select new Skp {
                    idjabatan = a.idjabatan,
                    idpegawai = a.idpegawai, idpejabatpenilai = a.idpejabatpenilai, idperiode = a.idperiode, idskp = a.idskp,
                    tanggal = a.tanggal, periode = b, PejabatPenilai = d, AtasanPejabatPenilai = f
                };

                var pegawai = (from skp in result join a in db.Pegawai.Select () on skp.idpegawai equals a.idpegawai join b in db.User.Select () on a.iduser equals b.iduser join c in db.Jabatan.Select () on a.idjabatan equals c.idjabatan select new Pegawai {
                    iduser = a.iduser, idpegawai = a.idpegawai, jabatan = c, idjabatan = a.idjabatan,
                        nama = a.nama, nip = a.nip, pangkat = a.pangkat, tmt = a.tmt, unitorganisasi = a.unitorganisasi, status = b.aktif
                }).ToList ();

                var datas = from a in result join b in pegawai on a.idpegawai equals b.idpegawai
                select new Skp {
                    idjabatan = a.idjabatan,
                    idpegawai = a.idpegawai, idpejabatpenilai = a.idpejabatpenilai, idperiode = a.idperiode, idskp = a.idskp,
                    tanggal = a.tanggal, periode = a.periode, PejabatPenilai = a.PejabatPenilai, AtasanPejabatPenilai = a.AtasanPejabatPenilai, Pegawai = b
                };

                return Ok (datas);
            }
        }

    }
}