using System.Linq;
using System.Net;
using MainApp.Helpers;
using MainApp.Models;
using MainApp.Models.Data;
using MainApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MainApp.Controllers {
    [ApiController]
    [Route ("[controller]/[action]")]
    public class KegiatanController : ControllerBase {
        private readonly AppSettings _dbsetting;

        public KegiatanController (IOptions<AppSettings> setting) {
            _dbsetting = setting.Value;
        }

        [HttpGet]
        public IActionResult Get () {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.Kegiatan.Select ();
                return Ok (result);
            }
        }

        [HttpPost]
        public IActionResult Post (Targetskp data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var resultId = db.Kegiatan.InsertAndGetLastID (data);
                if (resultId > 0)
                    data.idtargetskp = resultId;
                return Ok (data);
            }
        }

        [HttpPut]
        public IActionResult Put (int id, Targetskp data) {
            try {
                using (var db = new OcphDbContext (this._dbsetting)) {
                    var result = db.Kegiatan.Update (x => new { x.kegiatan, x.kuantitas, x.kualitas, x.waktu, x.biaya }, data, x => x.idtargetskp == id);
                    if (result)
                        return Ok (result);
                    throw new System.Exception ("Data Tidak Berhasil Diubah");

                }
            } catch (System.Exception ex) {

                return BadRequest (ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult Delete (int id) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.Kegiatan.Delete (x => x.idtargetskp == id);
                return Ok (result);
            }
        }

    }
}