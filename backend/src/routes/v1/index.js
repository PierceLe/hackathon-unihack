const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const crisisRoute = require('./crisis.route'); // Import Crisis Route
const crisisStateRoute = require('./crisisState.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/crises',
    route: crisisRoute,
  },
  {
    path: '/crisesState',
    route: crisisStateRoute,
  },
];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
