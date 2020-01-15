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
    public class JabatanController : ControllerBase {
        private readonly AppSettings _dbsetting;

        public JabatanController (IOptions<AppSettings> setting) {
            _dbsetting = setting.Value;
        }

        [HttpGet]
        public IActionResult Get () {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.Jabatan.Select ();
                return Ok (result);
            }
        }

        [HttpPost]
        public IActionResult Post (Jabatan data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var resultId = db.Jabatan.InsertAndGetLastID (data);
                if (resultId > 0)
                    data.idjabatan = resultId;
                return Ok (data);
            }
        }

        [HttpPut]
        public IActionResult Put (int id, Jabatan data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.Jabatan.Update (x => new { x.jenis, x.nama }, data, x => x.idjabatan == id);
                return Ok (result);
            }
        }

        [HttpDelete]
        public IActionResult Delete (int id) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.Jabatan.Delete (x => x.idjabatan == id);
                return Ok (result);
            }
        }

    }
}