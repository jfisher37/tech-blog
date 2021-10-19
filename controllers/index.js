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


router.get('/post', async (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    }
      try {
        const postData = await Post.findByPk(req.params.id, {
          include: [
            {
              model: Comment,
              attributes: ['content'],
            },
          ],
        }
        );
    
        const posts = postData.map((post) =>
          post.get({ plain: true })
        );
    
        console.log({posts});
    
        res.render('post', {
          posts
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });

module.exports = router;