angular.module('app.pejabatPenilai.router', [ 'ui.router' ]).config(function($stateProvider) {
	// creating routes or states
	$stateProvider
		//admin
		.state('pejabat', {
			url: '/pejabat',
			controller: 'pejabat.controller',
			templateUrl: './templates/pejabatpenilai/pejabatpenilai.html'
		})
		.state('pejabat-home', {
			url: '/home',
			parent: 'pejabat',
			controller: 'pejabat.home.controller',
			templateUrl: './templates/pejabatpenilai/home.html'
		})
		.state('pejabat-pegawai', {
			url: '/pegawai',
			parent: 'pejabat',
			controller: 'pejabat.pegawai.controller',
			templateUrl: './templates/pejabatpenilai/pegawai.html'
		})
		.state('pejabat-persetujuan', {
			url: '/persetujuan',
			parent: 'pejabat',
			controller: 'pejabat.persetujuan.controller',
			templateUrl: './templates/pejabatpenilai/setujui.html'
		})
		.state('pejabat-nilai', {
			url: '/nilai/:Id',
			parent: 'pejabat',
			controller: 'pejabat.nilai.controller',
			templateUrl: './templates/pejabatpenilai/nilai.html'
		})
		.state('pejabat-setujuinilai', {
			url: '/setujuinilai/:Id',
			parent: 'pejabat',
			controller: 'pejabat.setujuinilai.controller',
			templateUrl: './templates/pejabatpenilai/setujuinilai.html'
		});
});
