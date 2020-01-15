using System.Collections.Generic;
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
    [Authorize]
    [ApiController]
    [Route ("[controller]/[action]")]
    public class RealisasiController : ControllerBase {
        private readonly AppSettings _dbsetting;

        public RealisasiController (IOptions<AppSettings> setting) {
            _dbsetting = setting.Value;
        }

        [HttpGet]
        public IActionResult Get () {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var result = db.Realisasi.Select ();
                return Ok (result);
            }
        }

        [HttpGet]
        public IActionResult GetBySkpId (int Id) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var user = User.GetProfile (db);
                var target = from a in db.TargetSKP.Where (x => x.idskp == Id)
                join s in db.SatuanKerja.Select () on a.idsatuankerja equals s.idsatuankerja into sgrp
                from s in sgrp.DefaultIfEmpty ()

                join b in db.Realisasi.Select () on a.idtargetskp equals b.idtargetskp into grp
                from b in grp.DefaultIfEmpty ()
                select new Targetskp {
                    bobot = s == null?0 : s.bobot, jenis = a.jenis,
                    idtargetskp = a.idtargetskp, kualitas = a.kualitas,
                    kuantitas = a.kuantitas, kegiatan = a.kegiatan, waktu = a.waktu, biaya = a.biaya, idskp = a.idskp,
                    Realisasi = b == null? new Realisasiskp { idtargetskp = a.idtargetskp }: b,
                    total = a.total, capaian = a.capaian
                };

                var perilaku = from a in db.PerilakuKerja.Select ()
                join b in db.NilaiPerilaku.Where (x => x.idskp == Id) on a.idperilaku equals b.idperilaku into grp
                from b in grp.DefaultIfEmpty ()
                select new Perilakukerja {
                    idperilaku = a.idperilaku, perilaku = a.perilaku,
                    nilaiperilaku = b == null?new Nilaiperilaku { idskp = Id, nilai = 0, idperilaku = a.idperilaku }: b
                };
                return Ok (new Penilaian { Targetskps = target.ToList (), Perilaku = perilaku.ToList () });
            }
        }

        [HttpPost]
        public IActionResult Post (Penilaian data) {
            using (var db = new OcphDbContext (this._dbsetting)) {
                var trans = db.BeginTransaction ();
                try {
                    foreach (var item in data.Targetskps) {
                        Realisasiskp realisasiskp = item.Realisasi;
                        if (item.Realisasi.idrealisasiskp == 0) {
                            item.Realisasi.idrealisasiskp = db.Realisasi.InsertAndGetLastID (realisasiskp);
                            if (item.Realisasi.idrealisasiskp == 0)
                                throw new System.Exception ("Data tidak tersimpan");
                        } else {
                            var updated = db.Realisasi.Update (x => new { x.kualitas, x.kuantitas, x.biaya }, item.Realisasi,
                                x => x.idrealisasiskp == realisasiskp.idrealisasiskp);
                            if (!updated) {
                                throw new System.Exception ("Data tidak tersimpan");
                            }

                        }
                    }

                    foreach (var item in data.Perilaku) {
                        Nilaiperilaku nilai = item.nilaiperilaku;
                        if (nilai != null) {
                            if (nilai.idnilaiperilaku == 0) {
                                nilai.idnilaiperilaku = db.NilaiPerilaku.InsertAndGetLastID (nilai);
                            } else {
                                var updated = db.NilaiPerilaku.Update (x => new { x.nilai }, nilai, x => x.idnilaiperilaku == nilai.idnilaiperilaku);
                                if (!updated)
                                    throw new System.Exception ("Data tidak tersimpan");
                            }
                        }

                    }

                    trans.Commit ();
                    return Ok (data);
                } catch (System.Exception ex) {
                    trans.Rollback ();
                    return BadRequest (ex.Message);
                }
            }
        }

    }

    public class Penilaian {
        public List<Targetskp> Targetskps { get; set; }
        public List<Perilakukerja> Perilaku { get; set; }
    }
}