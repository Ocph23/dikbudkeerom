angular.module('app.periode.service', []).factory('PeriodeService', periodeService);

function periodeService($http, AuthService, helperServices, message, $q) {
	var datas = [];
	var instance = false;

	return {
		get: get,
		post: post,
		put: put,
		delete: deleteItem,
		aktifPeriode: aktifPeriode
	};

	function aktifPeriode() {
		var defer = $q.defer();
		var periode = {};
		get().then((x) => {
			periode = datas.find((x) => x.status === 'Buka');
			if (periode) {
				if (new Date() <= new Date(periode.tanggalpengajuan)) {
					periode.canaddskp = true;
				}
				if (new Date() <= new Date(periode.tanggalrealisasi)) {
					periode.canaddrealisasi = true;
				}
				if (new Date() > new Date(periode.tanggalrealisasi)) {
					periode.canaddpenilaian = true;
				}

				defer.resolve(periode);
			} else {
				message.error('Periode Penilaian Belum Di Buka');
				defer.reject();
			}
		});

		return defer.promise;
	}

	function get() {
		var defer = $q.defer();
		if (instance) defer.resolve(datas);
		else {
			$http({
				method: 'Get',
				url: helperServices.url + '/periode/get',
				headers: AuthService.getHeader()
			}).then(
				(response) => {
					instance = true;
					datas = response.data;
					defer.resolve(datas);
				},
				(err) => {
					message.errorHttp(err);
				}
			);
		}

		return defer.promise;
	}
	function post(data) {
		var defer = $q.defer();
		$http({
			method: 'Post',
			url: helperServices.url + '/periode/post',
			data: data,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				datas.push(response.data);
				defer.resolve(response.data);
			},
			(err) => {
				message.errorHttp(err);
			}
		);

		return defer.promise;
	}
	function put(data) {
		var defer = $q.defer();
		$http({
			method: 'put',
			url: helperServices.url + '/periode/put?id=' + data.idperiode,
			data: data,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				defer.resolve(response.data);
			},
			(err) => {
				message.errorHttp(err);
			}
		);

		return defer.promise;
	}

	function deleteItem(id) {
		var defer = $q.defer();
		$http({
			method: 'delete',
			url: helperServices.url + '/periode/delete/?id=' + id,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				defer.resolve(response.data);
			},
			(err) => {
				message.errorHttp(err);
			}
		);

		return defer.promise;
	}
}
