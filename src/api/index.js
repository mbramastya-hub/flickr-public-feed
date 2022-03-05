const router = require('express').Router();

const feedQuery =  require('./controllers/feeds/query/domain');

const basicAuth = require('../helpers/auth/basicAuth');

// Initialize basic authentication.
router.use(basicAuth.init());

/**
 * @modules
 * Users module.
 */

router.get('/feeds/photos', basicAuth.isAuthenticated, feedQuery.getPublicPhotos);

module.exports = router;
