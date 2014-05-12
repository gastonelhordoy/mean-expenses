'use strict';

angular.module('projectGastonElhordoyApp')
    .factory('Session', function($resource) {
        return $resource('/api/session/');
    });
