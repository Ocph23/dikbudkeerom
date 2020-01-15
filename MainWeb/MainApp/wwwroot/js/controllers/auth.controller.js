angular.module('app.auth.controller', []).controller('AuthController', AuthController);

function AuthController($scope, AuthService, $state, message, JabatanService) {
	JabatanService.get().then((x) => {
		$scope.Jabatan = x;
	});
	$scope.login = function(loginModel) {
		AuthService.login(loginModel).then((response) => {
			if (response) {
				if (response.roles.length == 1) {
					var key = response.roles[0];
					$state.go(key.toLowerCase());
				} else {
					var key = response.roles[1];
					$state.go(key.toLowerCase());
				}
			}
		});
	};

	$scope.register = function(model) {
		model.idjabatan = model.jabatan.idjabatan;
		AuthService.register(model).then((response) => {
			if (response) {
				message.info('Registrasi Berhasil');
				$state.go('login');
			}
		});
	};
}
