const router = require('express').Router();
const { Post, User } = require('../models');

router.post('/', async (req, res) => {
  try {
     await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    console.log("new post added");
    res.status(200).json("hey");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
    try {
      const userData = await User.findByPk(req.session.user_id, {
        include: [
          {
            model: Post,
            attributes: ['title', 'content', 'id'],
          },
        ],
      }
      );
  
      const user = userData.get({ plain: true });
  
  
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