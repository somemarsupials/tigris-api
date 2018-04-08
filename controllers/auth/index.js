const express = require('express');
const router = express.Router();

// middlewares

router.use(require('../../middlewares/requestOrigin'));
router.use(require('../../middlewares/httpClient'));

// routes

const routes = [
  'spotify',
];

routes.forEach(route => {
  router.use(`/${route}`, require(`./${route}`));
});

module.exports = router;
