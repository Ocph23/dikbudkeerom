angular.module('app.report.router', [ 'ui.router' ]).config(function($stateProvider) {
	// creating routes or states
	$stateProvider
		//admin
		.state('report', {
			url: '/report',
			templateUrl: './templates/reports/report.html',
			controller: 'report.controller'
		})
		.state('reportskp', {
			url: '/skp/:Id',
			parent: 'report',
			controller: 'report.skp.controller',
			templateUrl: './templates/reports/skp.html'
		})
		.state('reportformskp', {
			url: '/formskp/:Id',
			parent: 'report',
			controller: 'report.formskp.controller',
			templateUrl: './templates/reports/formskp.html'
		});
});
