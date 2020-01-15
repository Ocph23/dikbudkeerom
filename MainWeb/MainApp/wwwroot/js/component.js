angular.module('app.conponent', []).component('userlogin', {
	controller: function($scope, AuthService) {
		AuthService.profile().then((x) => {
			if (x) {
				this.username = x.nama;
			} else {
				this.username = AuthService.getUserName();
			}
		});

		$scope.logoff = function() {
			AuthService.logOff();
		};
	},
	template: `{{$ctrl.username}}
    <span>| <a href="" ng-click="logoff()">Log Off</a></span>
    `
});
