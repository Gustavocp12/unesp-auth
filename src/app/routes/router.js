import loginRoutes from './loginRoutes';

const routes = (app) => {
    app.use(
        loginRoutes
    );
}

module.exports = routes;