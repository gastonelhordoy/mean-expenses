'use strict';

angular.module('projectGastonElhordoyApp')
    .factory('User', ['$resource', function User($resource) {
        return $resource('/api/users/:id', {
            id: '@id'
        }, { //parameters default
            update: {
                method: 'PUT',
                params: {}
            },
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            }
        });
    }]);
