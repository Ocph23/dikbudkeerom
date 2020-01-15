using System.Net;
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
    public class UserController : ControllerBase {
        private AppSettings _dbsetting;
        private IUserService _service;

        public UserController (IUserService service, IOptions<AppSettings> setting) {
            _dbsetting = setting.Value;
            _service = service;
        }

        [HttpPost]
        public IActionResult login (UserLogin model) {
            try {
                return Ok (_service.Authenticate (model.UserName, model.Password));
            } catch (System.Exception ex) {
                return Unauthorized (ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult profile () {
            try {
                using (var db = new OcphDbContext (_dbsetting)) {
                    var profile = User.GetProfile (db);
                    return Ok (profile);
                }
            } catch (System.Exception ex) {
                return Unauthorized (ex.Message);
            }
        }

        [HttpPost]
        public IActionResult RegisterPns (Pegawai model) {
            try {
                return Ok (_service.RegisterPNS (model));
            } catch (System.Exception ex) {
                return BadRequest (ex.Message);
            }
        }
    }
}