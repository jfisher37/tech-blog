const router = require('express').Router();

const userRoutes = require('./user-routes');

router.use('/login', userRoutes);

module.exports = router;