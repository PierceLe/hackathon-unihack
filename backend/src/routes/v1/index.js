const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const crisisRoute = require('./crisis.route');
const crisisStateRoute = require('./crisisState.route');
const gameStateRoute = require('./gameState.route'); // Thêm GameState route
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
    path: '/crisis-states', // Sửa lại theo đúng format
    route: crisisStateRoute,
  },
  {
    path: '/game-states', // Thêm GameState route
    route: gameStateRoute,
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
