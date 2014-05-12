'use strict';

angular.module('projectGastonElhordoyApp')
    .controller('ExpenseCtrl', ['$scope', '$location', 'growl', 'originalExpense',
    function($scope, $location, growl, originalExpense) {
        // var originalExpense = $route.current.locals.originalExpense;
        $scope.expenseToEdit = angular.copy(originalExpense);

        function showAlertOnError(err) {
            var alertMsg = 'Error saving your changes: ' + err.data && err.data.error && err.data.error.message ? err.data.error.message : JSON.stringify(err);
            growl.addErrorMessage(alertMsg);
        }

        $scope.isEditing = function() {
            // it can also be done checking the path /create or /edit
            return $scope.expenseToEdit._id;
        };


        if ($scope.isEditing()) {
            $scope.expenseFormTitle = 'Edit Expense';
        } else {
            $scope.expenseFormTitle = 'New Expense';
        }

        // create a new expense locally save it remotely
        $scope.saveExpense = function addExpense() {
            if ($scope.expenseForm.$invalid) {
                $scope.expenseForm.submitted = true;
                return;
            }

            var expenseToEdit = $scope.expenseToEdit;
            if ($scope.isEditing()) {
                expenseToEdit.$update(function(obj) {
                    $location.path('/');
                    growl.addSuccessMessage("Expense succesfully updated: " + obj.description);
                }, showAlertOnError);
            } else {
                expenseToEdit.$save(function(obj) {
                    $location.path('/');
                    growl.addSuccessMessage("Expense succesfully created: " + obj.description);
                }, showAlertOnError);
            }
        };

        $scope.deleteExpense = function deleteExpense() {
            if (confirm('Are you sure you want to delete the expense?')) {
                $scope.expenseToEdit.$delete(function(obj) {
                    $location.path('/');
                    growl.addSuccessMessage("Expense succesfully deleted: " + obj.description);
                }, showAlertOnError);
            }
        };

        $scope.isClean = function() {
            return angular.equals(originalExpense, $scope.expenseToEdit);
        };

        $scope.openedDatePopup = false;
        $scope.openDatePopup = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.openedDatePopup = !$scope.openedDatePopup;
        };

    }]);
