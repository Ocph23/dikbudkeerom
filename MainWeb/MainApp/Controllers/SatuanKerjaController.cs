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
    public class SatuanKerjaController : ControllerBase {
        private readonly AppSettings _dbsetting;

        public SatuanKerjaController (IOptions<AppSettings> setting) {
            _dbsetting = setting.Value;
        }

        [HttpGet]
        public IActionResult Get (int id) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.SatuanKerja.Where (x => x.idjabatan == id);
                return Ok (result);
            }
        }

        [HttpPost]
        public IActionResult Post (Satuankerja data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var resultId = db.SatuanKerja.InsertAndGetLastID (data);
                if (resultId > 0)
                    data.idsatuankerja = resultId;
                return Ok (data);
            }
        }

        [HttpPut]
        public IActionResult Put (int id, Satuankerja data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.SatuanKerja.Update (x => new { x.jenis, x.kegiatan, x.bobot }, data, x => x.idsatuankerja == id);
                return Ok (result);
            }
        }

        [HttpDelete]
        public IActionResult Delete (int id) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.SatuanKerja.Delete (x => x.idsatuankerja == id);
                return Ok (result);
            }
        }

    }
}