angular.module('auth.service', []).factory('AuthService', AuthService);

function AuthService($http, $q, StorageService, $state, helperServices, message) {
	var service = {};

	return {
		login: login,
		logOff: logoff,
		userIsLogin: userIsLogin,
		getUserName: getUserName,
		userIsLogin: userIsLogin,
		userInRole: userInRole,
		getHeader: getHeader,
		url: service.url,
		register: register,
		profile: profile,
		Init: Init
	};

	function Init(roles) {
		var found = false;
		roles.forEach((element) => {
			if (userInRole(element)) {
				found = true;
				return;
			}
		});

		if (!found) $state.go('login');
	}

	function login(user) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + '/user/login',
			headers: getHeader(),
			data: user
		}).then(
			(res) => {
				StorageService.addObject('user', res.data);
				def.resolve(res.data);
			},
			(err) => {
				def.reject();
				message.errorHttp(err);
			}
		);

		return def.promise;
	}

	function profile() {
		var def = $q.defer();
		var profile = StorageService.getObject('profile');
		if (profile) def.resolve(profile);
		else {
			$http({
				method: 'Get',
				url: helperServices.url + '/user/profile',
				headers: getHeader()
			}).then(
				(res) => {
					StorageService.addObject('profile', res.data);
					def.resolve(res.data);
				},
				(err) => {
					def.reject();
					message.errorHttp(err);
				}
			);
		}

		return def.promise;
	}

	function register(user) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + '/user/RegisterPns',
			headers: getHeader(),
			data: user
		}).then(
			(res) => {
				def.resolve(res.data);
			},
			(err) => {
				def.reject();
				message.errorHttp(err);
			}
		);

		return def.promise;
	}

	function getHeader() {
		try {
			if (userIsLogin()) {
				return {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + getToken()
				};
			}
			throw new Error('Not Found Token');
		} catch (ex) {
			return {
				'Content-Type': 'application/json'
			};
		}
	}

	function logoff() {
		StorageService.clear();
		$state.go('login');
	}

	function getUserName() {
		if (userIsLogin) {
			var result = StorageService.getObject('user');
			if (result) return result.username;
			else return 'User Name';
		}
	}

	function userIsLogin() {
		var result = StorageService.getObject('user');
		if (result) {
			return true;
		}
	}

	function userInRole(role) {
		var result = StorageService.getObject('user');
		if (result && result.roles.find((x) => (x.name = role))) {
			return true;
		}
	}

	function getToken() {
		var result = StorageService.getObject('user');
		if (result) {
			return result.token;
		}
	}
}
