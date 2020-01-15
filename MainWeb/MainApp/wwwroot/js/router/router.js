angular
	.module('app.router', [
		'ui.router',
		'app.admin.router',
		'app.pejabatPenilai.router',
		'app.pegawai.router',
		'app.report.router'
	])
	.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
		// creating routes or states
		$stateProvider
			.state('login', {
				url: '/',
				templateUrl: './templates/Auth/login.html',
				controller: 'AuthController'
			})
			.state('registrasi', {
				url: '/registrasi',
				templateUrl: './templates/Auth/registrasi.html',
				controller: 'AuthController'
			})
			.state('home', {
				url: '/home',
				templateUrl: './templates/home.html'
			})
			//Kepala Dinas
			.state('kasubag', {
				url: '/kasubag',
				templateUrl: './templates/kasubag/home.html',
				controller: 'kasubag.home.controller'
			})
			.state('kasubag-child', {
				url: '/child',
				parent: 'kasubag',
				templateUrl: './templates/kasubag/child.html'
			});
		//

		// Redirect to home page if url does not
		// matches any of the three mentioned above
		$urlRouterProvider.otherwise('/');
	});
