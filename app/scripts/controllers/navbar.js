'use strict';

angular.module('projectGastonElhordoyApp')
    .controller('NavbarCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }, {
            'title': 'Settings',
            'link': '/settings'
        }];

        $scope.logout = function() {
            Auth.logout()
                .then(function() {
                    $location.path('/');
                });
        };

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    }]);
