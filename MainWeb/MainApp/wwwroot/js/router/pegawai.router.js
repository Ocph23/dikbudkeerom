angular.module('app.pegawai.router', [ 'ui.router' ]).config(function($stateProvider) {
	// creating routes or states
	$stateProvider
		//admin
		.state('pegawai', {
			url: '/pegawai',
			controller: 'pegawai.controller',
			templateUrl: './templates/pegawai/pegawai.html'
		})
		.state('pegawai-home', {
			url: '/home',
			parent: 'pegawai',
			controller: 'pegawai.home.controller',
			templateUrl: './templates/pegawai/home.html'
		})
		.state('pegawai-skp', {
			url: '/skp',
			parent: 'pegawai',
			controller: 'pegawai.skp.controller',
			templateUrl: './templates/pegawai/skp.html'
		})
		.state('pegawai-realisasi', {
			url: '/realisasi',
			parent: 'pegawai',
			controller: 'pegawai.realisasi.controller',
			templateUrl: './templates/pegawai/realisasi.html'
		})
		.state('pegawai-inputskp', {
			url: '/inputskp/:Id/:idperiode',
			parent: 'pegawai',
			controller: 'pegawai.inputskp.controller',
			templateUrl: './templates/pegawai/inputskp.html'
		})
		.state('pegawai-inputrealisasi', {
			url: '/inputrealisasi/:Id/:idperiode',
			parent: 'pegawai',
			controller: 'pegawai.inputrealisasi.controller',
			templateUrl: './templates/pegawai/inputrealisasi.html'
		});
});
