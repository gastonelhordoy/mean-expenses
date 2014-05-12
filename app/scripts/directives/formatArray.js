'use strict';

angular.module('projectGastonElhordoyApp')

/**
 * Formats an array as a comma-separated list of values with out
 */
.filter('reverse', function() {
    return function(input, uppercase) {
        var out = "";
        for (var i = 0; i < input.length; i++) {
            out = input.charAt(i) + out;
        }
        // conditional based on optional argument
        if (uppercase) {
            out = out.toUpperCase();
        }
        return out;
    };
});
