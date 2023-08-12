const loginRoutes = require('./loginRoutes');

const routes = (app) => {
    app.use(
        loginRoutes
    );
}

module.exports = routes;