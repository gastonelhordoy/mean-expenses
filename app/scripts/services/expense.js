'use strict';

angular.module('projectGastonElhordoyApp')
    .factory('Expense', ['$resource', function Expense($resource) {
        return $resource('/api/expenses/:expenseId', {
            expenseId: '@_id'
        }, { //parameters default
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        });
    }]);
