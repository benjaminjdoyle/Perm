(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController)
	.controller('DialogController', DialogController)
	.controller('LoginDialogController', LoginDialogController)

	function GlobalController(UserFactory, $state, $mdToast, $mdDialog) {
		var vm = this;
		vm.user = {};
		vm.status = UserFactory.status
		vm.title = 'Welcome to our App!';

		vm.openRegisterModal = function(ev) {
			$mdDialog.show({
				controller: DialogController,
				templateUrl: '/templates/partials/registerModal.templ.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true

			})
			.then(function(user) {
				UserFactory.register(user).then(function(res) {
					
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

		vm.openLoginModal = function(ev) {
			$mdDialog.show({
				controller: LoginDialogController,
				templateUrl: '/templates/partials/loginModal.templ.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true
			})
			.then(function(user) {
				UserFactory.login(user).then(function(res) {
					$mdToast.show(
                    $mdToast.simple()
                        .content('Logged in!')
                        .position('bottom right')
                        .hideDelay(2000)
                	);
					$state.go('Home');
				}, function(err) {
	                $mdToast.show(
	                    $mdToast.simple()
	                        .content('Unable to login. Please try again.')
	                        .position('bottom right')
	                        .hideDelay(2000)
	                );
				});
			});
		}

		

		vm.logout = function() {
            $mdToast.show(
                $mdToast.simple()
                    .content('Logged out.')
                    .position('bottom right')
                    .hideDelay(2000)
            );
			UserFactory.removeToken();
			$state.go('Home');
		};

	}

	function DialogController($scope, $mdDialog) {
		$scope.register = function() {
			$mdDialog.hide($scope.user);
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	};

	function LoginDialogController($scope, $mdDialog) {
		$scope.login = function() {
			$mdDialog.hide($scope.user);
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	};
})();
