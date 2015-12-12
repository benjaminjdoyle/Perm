(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController)
	.controller('DialogueController', DialogueController)
	//.controller('LoginDialogueController', LoginDialogueController)

	function GlobalController(UserFactory, $state, $mdToast, $mdDialog) {
		var vm = this;
		vm.user = {};
		vm.status = UserFactory.status
		vm.title = 'Welcome to our App!';

		vm.openRegisterModal = function(ev) {
			$mdDialog.show({
				controller: DialogueController,
				templateUrl: '/templates/partials/registerModal.templ.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true

			})
			.then(function(user) {
				UserFactory.register(user).then(function(res) {
					
					// $mdToast.show(
					// 	$mdToast.simple()
					// 		.content('Welcome to Perm!')
					// 		.position('bottom right')
					// 		.hideDelay(2000)
					// );
					$state.go('Home');
				} 
				// function(err) {
				// 	$mdToast.show(
				// 		$mdToast.simple()
				// 		.content('Whoops. Better try again.')
				// 		.position('bottom right')
				// 		.hideDelay(3000)
				// 	);
				// }
				);
			});
		}

		

		vm.logout = UserFactory.removeToken;

		//vm.login = function()..................
	}

	function DialogueController($scope, $mdDialog) {
			$scope.register = function() {
				$mdDialog.hide($scope.user);
			};
			$scope.cancel = function() {
				$mdDialog.cancel();
			};
		};
})();
