const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    try {
      const userData = await User.findByPk(1, {
        include: [
          {
            model: Post,
            attributes: ['title', 'content', 'id'],
          },
        ],
      }
      );
  
      const user = userData.get({ plain: true });
  
      console.log({user});
  
      res.render('dashboard', {
        user,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;