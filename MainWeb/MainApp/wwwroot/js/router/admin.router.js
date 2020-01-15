angular.module('app.admin.router', [ 'ui.router' ]).config(function($stateProvider) {
	// creating routes or states
	$stateProvider
		//admin
		.state('admin', {
			url: '/admin',
			controller: 'admin.controller',
			templateUrl: './templates/admin/admin.html'
		})
		.state('admin-home', {
			url: '/home',
			parent: 'admin',
			templateUrl: './templates/admin/home.html',
			controller: 'admin.home.controller'
		})
		.state('admin-periode', {
			url: '/periode',
			parent: 'admin',
			controller: 'admin.periode.controller',
			templateUrl: './templates/admin/periode.html'
		})
		.state('admin-pegawai', {
			url: '/pegawai',
			parent: 'admin',
			controller: 'admin.pegawai.controller',
			templateUrl: './templates/admin/pegawai.html'
		})
		.state('admin-pejabatpenilai', {
			url: '/pejabatpenilai',
			parent: 'admin',
			controller: 'admin.pejabatpenilai.controller',
			templateUrl: './templates/admin/pejabatpenilai.html'
		})
		.state('admin-add-pejabatpenilai', {
			url: '/addpejabatpenilai',
			parent: 'admin',
			controller: 'admin.addpejabatpenilai.controller',
			templateUrl: './templates/admin/addpejabatpenilai.html'
		})
		.state('admin-kegiatan', {
			url: '/kegiatan',
			parent: 'admin',
			controller: 'admin.kegiatan.controller',
			templateUrl: './templates/admin/kegiatan.html'
		})
		.state('admin-perilaku', {
			url: '/perilaku',
			parent: 'admin',
			controller: 'admin.perilaku.controller',
			templateUrl: './templates/admin/perilaku.html'
		})
		.state('admin-jabatan', {
			url: '/jabatan',
			parent: 'admin',
			controller: 'admin.jabatan.controller',
			templateUrl: './templates/admin/jabatan.html'
		})
		.state('admin-satuankerja', {
			url: '/satuankerja/{data:json}',
			parent: 'admin',
			controller: 'admin.satuankerja.controller',
			templateUrl: './templates/admin/satuankerja.html'
		});
});
