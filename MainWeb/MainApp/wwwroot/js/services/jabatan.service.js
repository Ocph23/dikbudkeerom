angular
	.module('app.jabatan.service', [])
	.factory('JabatanService', JabatanService)
	.factory('SatuanKerjaService', SatuanKerjaService);

function JabatanService($http, AuthService, helperServices, message, $q) {
	var datas = [];
	var instance = false;

	return {
		get: get,
		post: post,
		put: put,
		delete: deleteItem
	};
	function get() {
		var defer = $q.defer();
		if (instance) defer.resolve(datas);
		else {
			$http({
				method: 'Get',
				url: helperServices.url + '/jabatan/get',
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
			url: helperServices.url + '/jabatan/post',
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
			url: helperServices.url + '/jabatan/put?id=' + data.idjabatan,
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
			url: helperServices.url + '/jabatan/delete/?id=' + id,
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

function SatuanKerjaService($http, AuthService, helperServices, message, $q) {
	var datas = [];
	var instance = false;

	return {
		get: get,
		post: post,
		put: put,
		delete: deleteItem
	};
	function get(id) {
		var defer = $q.defer();
		if (instance) defer.resolve(datas);
		else {
			$http({
				method: 'Get',
				url: helperServices.url + '/satuankerja/get?id=' + id,
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
			url: helperServices.url + '/satuankerja/post',
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
			url: helperServices.url + '/satuankerja/put?id=' + data.idsatuankerja,
			data: data,
			headers: AuthService.getHeader()
		}).then(
			(response) => {
				if (response.data) defer.resolve(response.data);
				else {
					defer.reject();
					message.error('data tidak tersimpan');
				}
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
			url: helperServices.url + '/satuankerja/delete?id=' + id,
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
