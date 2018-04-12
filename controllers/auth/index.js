const express = require('express');
const routerGenerator = require('../../lib/oauth/router');

const router = express.Router();
const generator = routerGenerator();


// middlewares

router.use(require('../../middlewares/requestOrigin'));
router.use(require('../../middlewares/httpClient'));

// routes

const routes = [
  'spotify',
];

routes.forEach(route => {
  let subRouter = generator.generate(express.Router(), route);
  router.use(`/${route}`, subRouter);
});

module.exports = router;
