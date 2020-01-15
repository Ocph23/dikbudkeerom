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
    public class PerilakuController : ControllerBase {
        private readonly AppSettings _dbsetting;

        public PerilakuController (IOptions<AppSettings> setting) {
            _dbsetting = setting.Value;
        }

        [HttpGet]
        public IActionResult Get () {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.Perilaku.Select ();
                return Ok (result);
            }
        }

        [HttpPost]
        public IActionResult Post (Perilakukerja data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var resultId = db.Perilaku.InsertAndGetLastID (data);
                if (resultId > 0)
                    data.idperilaku = resultId;
                return Ok (data);
            }
        }

        [HttpPut]
        public IActionResult Put (int id, Perilakukerja data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.Perilaku.Update (x => new { x.perilaku }, data, x => x.idperilaku == id);
                return Ok (result);
            }
        }

        [HttpDelete]
        public IActionResult Delete (int id) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.Perilaku.Delete (x => x.idperilaku == id);
                return Ok (result);
            }
        }

    }
}