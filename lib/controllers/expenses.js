var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Expense = mongoose.model('Expense'),
    _ = require('lodash');

/**
 * Find expense by id and store it in the request
 */
exports.expense = function(req, res, next, id) {
    Expense.findById(new ObjectId(id), function(err, expense) {
        if (err) { return next(err); }
        if (!expense) { return next(new Error('Failed to load expense ' + id)); }
        if (!expense.user.equals(req.user._id)) { return res.send(403, 'Required expense does not belong to user'); }

        req.expense = expense;
        next();
    });
};

/**
 * List of expenses
 */
exports.query = function(req, res) {
    // req.query => {"count":"5","filter":"{\"description\":\"C\"}","group":"{}","page":"1","sorting":"{\"timestamp\":\"desc\"}"}

    var findOptions = { user: req.user._id };
    var sortingOptions;
    var paginationOptions;

    if (req.query.filter) {
        var filter = JSON.parse(req.query.filter);
        if (filter.description) {
            findOptions.description = new RegExp(filter.description, 'i');
        }
    }
    if (req.query.sorting) {
        sortingOptions = JSON.parse(req.query.sorting);
    }
    if (req.query.count && req.query.page) {
        paginationOptions = { perPage: req.query.count, page: req.query.page };
    }


    var query = Expense.find(findOptions);
    if (sortingOptions) {
        query.sort(sortingOptions);
    }
    if (paginationOptions) {
        query.paginate(paginationOptions, function(err, result) {
            if (err) { return res.json(500, err); }
            // res = {
            //     options: options,               // paginate options
            //     results: [Document, ...],       // mongoose results
            //     current: 5,                     // current page number
            //     last: 12,                       // last page number
            //     prev: 4,                        // prev number or null
            //     next: 6,                        // next number or null
            //     pages: [ 2, 3, 4, 5, 6, 7, 8 ], // page numbers
            //     count: 125                      // document count
            // };
            res.json({ docs: result.results, total: result.count, page: result.current });
        });
    } else {
        query.exec(function(err, docs) {
            if (err) { return res.json(500, err); }
            res.json({ docs: docs, total: docs.length, page: 1 });
        });
    }
};

/**
 * Show an expense
 */
exports.show = function(req, res) {
    res.json(req.expense);
};

/**
 * Create an expense
 */
exports.create = function(req, res) {
    var expense = new Expense(req.body);
    expense.user = req.user._id;

    expense.save(function(err) {
        if (err) return res.json(500, err);
        res.json(expense);
    });
};

/**
 * Update an expense
 */
exports.update = function(req, res) {
    var updatedExpense = _.extend(req.expense, req.body);

    updatedExpense.save(function(err) {
        if (err) return res.json(500, err);
        res.json(updatedExpense);
    });
};

/**
 * Remove an expense
 */
exports.remove = function(req, res) {
    var expense = req.expense;

    expense.remove(function(err) {
        if (err) return res.json(500, err);

        res.json(expense);
    });
};
