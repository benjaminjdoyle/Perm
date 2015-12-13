(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	function HomeFactory($http, $q, $window) {
		var o = {};

		o.getAllProspects = function() {
			var q = $q.defer();
			$http.get('/api/v1/prospects', {
				headers: {
					authorization: 'Bearer ' + $window.localStorage.getItem('token')
				}
			}).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.createProspect = function(prospect) {
			var q = $q.defer();
			$http.post('/api/v1/prospects', prospect, {
				headers: {
					authorization: 'Bearer ' + $window.localStorage.getItem('token')
				}
			}).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		
		return o;
	}
})();
