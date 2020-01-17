'use strict';
angular
	.module('app.skp.service', [])
	.factory('SkpService', SkpService)
	.factory('PenilaianSkpService', PenilaianSkpService)
	.factory('TargetSkpService', TargetSkpService);

function SkpService($http, AuthService, helperServices, message, $q) {
	var datas = [];
	var instance = false;

	return {
		get: get,
		getBySkpId: getBySkpId,
		post: post,
		put: putData,
		delete: deleteItem
	};
	function get(Id) {
		var defer = $q.defer();
		if (instance) defer.resolve(datas);
		else {
			$http({
				method: 'Get',
				url: helperServices.url + '/skp/GetByPegawaiId?Id=' + Id,
				headers: AuthService.getHeader()
			}).then(
				(response) => {
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
	function getBySkpId(Id, skpid) {
		var defer = $q.defer();
		if (instance) defer.resolve(datas);
		else {
			$http({
				method: 'Get',
				url: helperServices.url + '/skp/GetSkpBySkpIdAndPegawaiId?Id=' + Id + '&skpid=' + skpid,
				headers: AuthService.getHeader()
			}).then(
				(response) => {
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
			url: helperServices.url + '/skp/post',
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

	function putData(data) {
		var defer = $q.defer();
		$http({
			method: 'put',
			url: helperServices.url + '/skp/put?id=' + data.idskp,
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
			url: helperServices.url + '/skp/delete/?id=' + id,
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

function TargetSkpService($http, AuthService, helperServices, message, $q) {
	var datas = [];
	var instance = false;

	return {
		get: get,
		post: post,
		put: put,
		delete: deleteItem,
		aktifskp: aktifskp,
		getRealisasi: getRealisasi,
		getSkpItemById: getSkpItemById,
		saveRealisasi: saveRealisasi
	};

	function aktifskp() {
		var defer = $q.defer();

		if (instance) {
			var result = datas.find((x) => x.status === 0);
			if (result) defer.resolve(result);
			else {
				message.error('skp Penilaian Belum Di Buka');
				defer.reject();
			}
		} else {
			get().then((x) => {
				if (x) defer.resolve(x);
				else {
					message.error('skp Penilaian Belum Di Buka');
					defer.reject();
				}
			});
		}

		return defer.promise;
	}
	function get() {
		var defer = $q.defer();
		if (instance) defer.resolve(datas);
		else {
			$http({
				method: 'Get',
				url: helperServices.url + '/skp/get',
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

	function getSkpItemById(id) {
		var defer = $q.defer();
		$http({
			method: 'Get',
			url: helperServices.url + '/targetskp/GetBySkpId?Id=' + id,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				datas = response.data;
				defer.resolve(datas);
			},
			(err) => {
				message.errorHttp(err);
			}
		);
		return defer.promise;
	}
	function getRealisasi(id) {
		var defer = $q.defer();
		if (instance) defer.resolve(datas);
		else {
			$http({
				method: 'Get',
				url: helperServices.url + '/realisasi/GetBySkpId?Id=' + id,
				headers: AuthService.getHeader()
			}).then(
				(response) => {
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
			url: helperServices.url + '/targetskp/post',
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

	function saveRealisasi(data) {
		var defer = $q.defer();
		$http({
			method: 'Post',
			url: helperServices.url + '/realisasi/post',
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
	function put(data) {
		var defer = $q.defer();
		$http({
			method: 'put',
			url: helperServices.url + '/targetskp/put?id=' + data.idtargetskp,
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
			url: helperServices.url + '/targetskp/delete/?id=' + id,
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

function PenilaianSkpService() {
	return { penilaianStruktural: penilaianStruktural };

	function penilaianStruktural(target, realisasi) {
		var nilai = {};

		nilai.kuantitas = realisasi.kuantitas / target.kuantitas * 100;
		nilai.kualitas = realisasi.kualitas / target.kualitas * 100;
		nilai.waktu = (1.76 * target.waktu - target.waktu) / target.waktu * 100;
		nilai.biaya = (1.76 * target.biaya - realisasi.biaya) / target.biaya * 100;
		if (!nilai.biaya) nilai.biaya = 0;
		nilai.total = nilai.kuantitas + nilai.kualitas + nilai.waktu + nilai.biaya;
		nilai.capaian = nilai.biaya <= 0 ? nilai.total / 3 : nilai.total / 4;
		return nilai;
	}
}
