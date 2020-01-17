angular.module('app.pegawai.service', []).factory('PegawaiService', PegawaiService);

function PegawaiService($http, AuthService, helperServices, $q, message) {
	var datas = [];
	var pejabatPenilais = [];
	var instance = false;
	var instancepejabatPenilai = false;

	return {
		get: get,
		put: put,
		getPejabatPenilai: getPejabatPenilai,
		findNotAsPejabat: findPegawaiNotAsPejabat,
		setAsPejabat: setAsPejabat,
		verifikasi: verifikasi,
		pejabatGetPegawaiByPeriodeId: pejabatGetPegawaiByPeriodeId
	};
	function get() {
		var defer = $q.defer();
		if (instance) defer.resolve(datas);
		else {
			$http({
				method: 'Get',
				url: helperServices.url + '/pegawai/get',
				headers: AuthService.getHeader()
			}).then(
				(response) => {
					datas = response.data;
					defer.resolve(datas);
				},
				(err) => {
					helperServices.error(err);
				}
			);
		}

		return defer.promise;
	}

	function put(data) {
		var defer = $q.defer();
		$http({
			method: 'Put',
			url: helperServices.url + '/pegawai/put',
			headers: AuthService.getHeader(),
			data: data
		}).then(
			(response) => {
				defer.resolve(response.data);
				message.info('Data Tersimpan');
			},
			(err) => {
				helperServices.error(err);
			}
		);
		return defer.promise;
	}

	//pejabat Penilai

	function getPejabatPenilai() {
		var defer = $q.defer();
		if (instancepejabatPenilai) defer.resolve(pejabatPenilais);
		else {
			$http({
				method: 'Get',
				url: helperServices.url + '/pegawai/getPejabatPenilai',
				headers: AuthService.getHeader()
			}).then(
				(response) => {
					pejabatPenilais = response.data;
					defer.resolve(pejabatPenilais);
				},
				(err) => {
					helperServices.error(err);
				}
			);
		}

		return defer.promise;
	}

	function pejabatGetPegawaiByPeriodeId(id) {
		var defer = $q.defer();
		$http({
			method: 'Get',
			url: helperServices.url + '/pegawai/pejabatGetPegawaiByPeriodeId?id=' + id,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				pejabatPenilais = response.data;
				defer.resolve(pejabatPenilais);
			},
			(err) => {
				helperServices.error(err);
			}
		);

		return defer.promise;
	}

	function findPegawaiNotAsPejabat(nip) {
		var defer = $q.defer();
		this.get().then((x) => {
			var pegawai = x.find((pegawai) => pegawai.nip === nip);
			if (pegawai) {
				this.getPejabatPenilai().then((y) => {
					var mResult = y.find((m) => m.idpegawai === pegawai.idpegawai);
					if (mResult) {
						defer.reject(pegawai.nama + ' Nip ' + nip + ' Telah Menjadi Pejabat Penilai');
					} else {
						defer.resolve(pegawai);
					}
				});
			} else {
				defer.reject('Pegawai dengan Nip ' + nip + ' Tidak Ditemukan');
			}
		});

		return defer.promise;
	}

	function setAsPejabat(pegawai) {
		var defer = $q.defer();
		var model = { idpegawai: pegawai.idpegawai, pegawai: pegawai };
		$http({
			method: 'Post',
			url: helperServices.url + '/pegawai/setpejabat',
			data: model,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				pejabatPenilais.push(response.data);
				defer.resolve(response.data);
			},
			(err) => {
				helperServices.errorHttp(err);
			}
		);

		return defer.promise;
	}

	function verifikasi(data) {
		var defer = $q.defer();
		$http({
			method: 'Post',
			url: helperServices.url + '/pegawai/verifikasi',
			data: data,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				defer.resolve(response.data);
			},
			(err) => {
				helperServices.errorHttp(err);
			}
		);

		return defer.promise;
	}
}
