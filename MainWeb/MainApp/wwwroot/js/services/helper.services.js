angular.module('helper.service', []).factory('helperServices', helperServices);

function helperServices() {
	var service = {};
	service.url = 'https://localhost:5001';

	return { url: service.url };
}
