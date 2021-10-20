const router = require('express').Router();

// const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes');
const loginRoutes = require('./login-routes');
const postRoutes = require('./post-routes');

router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/login', loginRoutes);
router.use('/post', postRoutes);




module.exports = router;