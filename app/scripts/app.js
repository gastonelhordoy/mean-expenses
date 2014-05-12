'use strict';

angular.module('projectGastonElhordoyApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngLocale',
    'ngAnimate',
    'ngTable',
    'ngTableExport',
    'ui.bootstrap',
    'mgcrea.ngStrap',
    'angular-growl'
])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', '$datepickerProvider', '$timepickerProvider', 'growlProvider',
     function($routeProvider, $locationProvider, $httpProvider, $datepickerProvider, $timepickerProvider, growlProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/main',
                controller: 'MainCtrl',
                reloadOnSearch: false
            })
            .when('/login', {
                templateUrl: 'partials/login',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'partials/signup',
                controller: 'SignupCtrl'
            })
            .when('/settings', {
                templateUrl: 'partials/settings',
                controller: 'SettingsCtrl',
                authenticate: true
            })
            .when('/expense/create', {
                templateUrl: 'partials/expense',
                controller: 'ExpenseCtrl',
                authenticate: true,
                reloadOnSearch: false,
                resolve: {
                    'originalExpense': function originalExpense($q, $route, Expense) {
                        return new Expense();
                    }
                }
            })
            .when('/expense/edit/:id', {
                templateUrl: 'partials/expense',
                controller: 'ExpenseCtrl',
                authenticate: true,
                reloadOnSearch: false,
                resolve: {
                    'originalExpense': function originalExpense($q, $route, Expense) {
                        // http://stackoverflow.com/questions/11972026/delaying-angularjs-route-change-until-model-loaded-to-prevent-flicker
                        return Expense.get({ expenseId: $route.current.params.id }).$promise;
                    }
                }
            })
            .when('/reports/weekly', {
                templateUrl: 'partials/weeklyReport',
                controller: 'WeeklyReportCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('#');

        // Intercept 401s and redirect you to login
        $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
                return {
                    'responseError': function(response) {
                        if (response.status === 401) {
                            $location.path('/login');
                            return $q.reject(response);
                        } else {
                            return $q.reject(response);
                        }
                    }
                };
            }
        ]);

        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'yyyy/MM/dd'
        });
        angular.extend($timepickerProvider.defaults, {
            timeFormat: 'HH:mm'
        });
        growlProvider.onlyUniqueMessages(false);
        growlProvider.globalTimeToLive(5000);
    }])
    .run(['$rootScope', '$location', 'growl', 'Auth', function($rootScope, $location, growl, Auth) {
        // Redirect to main view and display an alert if any of the resolve promises are rejected
        $rootScope.$on('$routeChangeError', function(event, current, previous, err) {
            var msg = angular.isString(err) ? err : (err.data && err.data.error && err.data.error.message ? err.data.error.message : JSON.stringify(err));
            growl.addErrorMessage(msg);
            $location.path('/');
        });

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$routeChangeStart', function(event, next) {
            if (next.authenticate && !Auth.isLoggedIn()) {
                $location.path('/login');
            }
        });
    }]);
