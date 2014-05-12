'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    expenses = require('./controllers/expenses');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

    // Server API Routes
    app.param('expenseId', middleware.auth, expenses.expense);

    app.post('/api/expenses', middleware.auth, expenses.create);
    app.get('/api/expenses', middleware.auth, expenses.query);
    app.get('/api/expenses/:expenseId', middleware.auth, expenses.show);
    app.put('/api/expenses/:expenseId', middleware.auth, expenses.update);
    app.del('/api/expenses/:expenseId', middleware.auth, expenses.remove);

    app.post('/api/users', users.create);
    app.put('/api/users', middleware.auth, users.changePassword);
    app.get('/api/users/me', middleware.auth, users.me);
    app.get('/api/users/:id', users.show);

    app.post('/api/session', session.login);
    app.del('/api/session', middleware.auth, session.logout);

    // All undefined api routes should return a 404
    app.get('/api/*', function(req, res) {
        res.send(404);
    });

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', middleware.setUserCookie, index.index);
};
