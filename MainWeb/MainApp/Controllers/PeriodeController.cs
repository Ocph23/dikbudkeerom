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
    public class PeriodeController : ControllerBase {
        private readonly AppSettings _dbsetting;

        public PeriodeController (IOptions<AppSettings> setting) {
            _dbsetting = setting.Value;
        }

        [HttpGet]
        public IActionResult Get () {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.Periode.Select ();
                return Ok (result);
            }
        }

        [HttpPost]
        public IActionResult Post (Periode data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var trans = db.BeginTransaction ();
                try {

                    var buka = db.Periode.Select ().Where (x => x.status == StatusPeriode.Buka).FirstOrDefault ();
                    if (buka != null) {
                        buka.status = StatusPeriode.Tutup;
                        var updated = db.Periode.Update (x => new { x.status }, buka, x => x.idperiode == buka.idperiode);
                        if (updated) {
                            var resultId = db.Periode.InsertAndGetLastID (data);
                            if (resultId > 0)
                                data.idperiode = resultId;
                            trans.Commit ();
                            return Ok (data);
                        }
                    }

                    throw new System.Exception ("Data Tidak Tersimpan");
                } catch (System.Exception ex) {
                    trans.Rollback ();
                    return BadRequest (ex.Message);
                }
            }
        }

        [HttpPut]
        public IActionResult Put (int id, Periode data) {
            data.tanggalpengajuan = data.tanggalpengajuan.ToLocalTime ();
            data.tanggalrealisasi = data.tanggalrealisasi.ToLocalTime ();
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.Periode.Update (x => new { x.tahun, x.tanggalpengajuan, x.tanggalrealisasi, x.status }, data, x => x.idperiode == id);
                return Ok (result);
            }
        }

        [HttpDelete]
        public IActionResult Delete (int id) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.Periode.Delete (x => x.idperiode == id);
                return Ok (result);
            }
        }

    }
}