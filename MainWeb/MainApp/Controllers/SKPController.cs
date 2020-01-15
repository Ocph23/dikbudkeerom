using System.Linq;
using System.Net;
using MainApp;
using MainApp.Helpers;
using MainApp.Models;
using MainApp.Models.Data;
using MainApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MainApp.Controllers {
    [ApiController]
    [Route ("[controller]/[action]")]
    public class SKPController : ControllerBase {
        private readonly AppSettings _dbsetting;

        public SKPController (IOptions<AppSettings> setting) {
            _dbsetting = setting.Value;
        }

        [HttpGet]
        public IActionResult Get () {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.SKP.Select ();
                return Ok (result);
            }
        }

        [HttpGet]
        public IActionResult GetByPegawaiId (int Id) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = from a in db.SKP.Where (x => x.idpegawai == Id) join b in db.Periode.Select () on a.idperiode equals b.idperiode join c in db.PejabatPenilai.Select () on a.idpejabatpenilai equals c.idpejabat join d in db.Pegawai.Select () on c.idpegawai equals d.idpegawai join e in db.PejabatPenilai.Select () on a.idatasanpejabat equals e.idpejabat join f in db.Pegawai.Select () on e.idpegawai equals f.idpegawai

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

                return Ok (datas.ToList ());
            }
        }

        [HttpGet]
        public IActionResult GetSkpBySkpIdAndPegawaiId (int Id, int skpid) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = from a in db.SKP.Where (x => x.idskp == skpid) join b in db.Periode.Select () on a.idperiode equals b.idperiode join c in db.PejabatPenilai.Select () on a.idpejabatpenilai equals c.idpejabat join d in db.Pegawai.Select () on c.idpegawai equals d.idpegawai join e in db.PejabatPenilai.Select () on a.idatasanpejabat equals e.idpejabat join f in db.Pegawai.Select () on e.idpegawai equals f.idpegawai

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

                return Ok (datas.FirstOrDefault ());
            }
        }

        [HttpPost]
        public IActionResult Post (Skp data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var resultId = db.SKP.InsertAndGetLastID (data);
                if (resultId > 0)
                    data.idskp = resultId;
                return Ok (data);
            }
        }

        [HttpPut]
        public IActionResult Put (int id, Skp data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.SKP.Update (x => new { x.idpejabatpenilai, x.tanggal }, data, x => x.idskp == id);
                return Ok (result);
            }
        }

        [HttpDelete]
        public IActionResult Delete (int id) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.SKP.Delete (x => x.idskp == id);
                return Ok (result);
            }
        }

    }
}