'use strict';

angular.module('projectGastonElhordoyApp')
    .controller('MainCtrl', ['$scope', 'Auth', 'Expense', 'ngTableParams', 'growl',
    function($scope, Auth, Expense, ngTableParams, growl) {

        if (Auth.isLoggedIn()) {
            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 10,
                sorting: {
                    timestamp: 'desc'
                }
            }, {
                counts: [],
                total: 0,
                getData: function($defer, params) {
                    Expense.query(params.$params, function(response) {
                        params.total = function() {
                            return response.total;
                        };
                        $defer.resolve(response.docs);
                    });
                }
            });

        }
    }]);
