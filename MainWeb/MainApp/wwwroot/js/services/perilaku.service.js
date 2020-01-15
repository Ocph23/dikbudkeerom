angular.module('app.perilaku.service', []).factory('PerilakuService', perilakuService);

function perilakuService($http, AuthService, helperServices, message, $q) {
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
				url: helperServices.url + '/perilaku/get',
				header: AuthService.getHeader()
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
			url: helperServices.url + '/perilaku/post',
			data: data,
			header: AuthService.getHeader()
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
			url: helperServices.url + '/perilaku/put?id=' + data.idperilaku,
			data: data,
			header: AuthService.getHeader()
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
			url: helperServices.url + '/perilaku/delete/?id=' + id,
			header: AuthService.getHeader()
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
