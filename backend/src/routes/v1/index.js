const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const crisisRoute = require('./crisis.route');
const crisisStateRoute = require('./crisisState.route');
const gameStateRoute = require('./gameState.route');
const npcRoute = require('./npc.route');
const npcStateRoute = require('./npcState.route');
const taskRoute = require('./task.route');
const taskStateRoute = require('./taskState.route');
const traitRoute = require('./trait.route'); // Thêm Trait route
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
    path: '/crisis-states',
    route: crisisStateRoute,
  },
  {
    path: '/game-states',
    route: gameStateRoute,
  },
  {
    path: '/npcs',
    route: npcRoute,
  },
  {
    path: '/npc-states',
    route: npcStateRoute,
  },
  {
    path: '/tasks',
    route: taskRoute,
  },
  {
    path: '/task-states',
    route: taskStateRoute,
  },
  {
    path: '/traits', // Thêm route cho Trait
    route: traitRoute,
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
