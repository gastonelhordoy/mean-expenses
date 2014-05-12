'use strict';

describe('Service: Expense', function () {

  // load the service's module
  beforeEach(module('projectGastonElhordoyApp'));

  // instantiate service
  var Expense;
  beforeEach(inject(function (_Expense_) {
    Expense = _Expense_;
  }));

  it('should do something', function () {
    expect(!!Expense).toBe(true);
  });

});
