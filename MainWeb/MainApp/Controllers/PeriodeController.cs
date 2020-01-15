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
                var resultId = db.Periode.InsertAndGetLastID (data);
                if (resultId > 0)
                    data.idperiode = resultId;
                return Ok (data);
            }
        }

        [HttpPut]
        public IActionResult Put (int id, Periode data) {
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