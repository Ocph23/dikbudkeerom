using System.Linq;
using System.Net;
using MainApp;
using MainApp.Helpers;
using MainApp.Models;
using MainApp.Models.Data;
using MainApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MainApp.Controllers {
    [ApiController]
    [Route ("[controller]/[action]")]
    public class TargetSKPController : ControllerBase {
        private readonly AppSettings _dbsetting;

        public TargetSKPController (IOptions<AppSettings> setting) {
            _dbsetting = setting.Value;
        }

        [HttpGet]
        public IActionResult Get () {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.TargetSKP.Select ();
                return Ok (result);
            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetBySkpId (int Id) {
            try {
                using (var db = new OcphDbContext (this._dbsetting)) {
                    var user = User.GetProfile (db);
                    var result = from a in db.TargetSKP.Where (x => x.idskp == Id)
                    join b in db.SatuanKerja.Select () on a.idsatuankerja equals b.idsatuankerja into grp
                    from b in grp.DefaultIfEmpty ()
                    select new Targetskp {
                        biaya = a.biaya, idsatuankerja = a.idsatuankerja, idskp = a.idskp,
                        idtargetskp = a.idtargetskp, jenis = a.jenis, kegiatan = a.kegiatan,
                        kualitas = a.kualitas, kuantitas = a.kuantitas, waktu = a.waktu,
                        bobot = b == null?0 : b.bobot
                    };
                    return Ok (result);
                }
            } catch (System.Exception ex) {

                return BadRequest (ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post (Targetskp data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var resultId = db.TargetSKP.InsertAndGetLastID (data);
                if (resultId > 0)
                    data.idtargetskp = resultId;
                return Ok (data);
            }
        }

        [HttpPut]
        public IActionResult Put (int id, Targetskp data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.TargetSKP.Update (x => new { x.biaya, x.idskp, x.kegiatan, x.kualitas, x.kuantitas, x.waktu },
                    data, x => x.idtargetskp == id);
                return Ok (result);
            }
        }

        [HttpDelete]
        public IActionResult Delete (int id) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.TargetSKP.Delete (x => x.idtargetskp == id);
                return Ok (result);
            }
        }

    }
}