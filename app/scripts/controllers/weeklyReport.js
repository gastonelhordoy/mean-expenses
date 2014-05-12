'use strict';

angular.module('projectGastonElhordoyApp')
    .controller('WeeklyReportCtrl', ['$scope', 'Expense', 'ngTableParams', function($scope, Expense, ngTableParams) {

        $scope.printedOn = new Date();
        var aggregatedData = {};

        $scope.aggregatedData = function(group) {
            return aggregatedData[group];
        };

        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 0,
            sorting: {
                timestamp: 'desc'
            }
        }, {
            counts: [],
            total: 0,
            getData: function($defer, params) {
                Expense.query(params.$params, function(response) {
                    $defer.resolve(response.docs);
                });
            },
            groupBy: function(item) {
                var group = moment(item.timestamp, 'YYYY-MM-DD').format('[Year: ]YYYY[ | Week: ]W');
                if (!aggregatedData[group]) { aggregatedData[group] = 0; }
                aggregatedData[group] += item.amount;
                return group;
            }
        });

    }]);
