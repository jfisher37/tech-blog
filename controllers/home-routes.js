const router = require('express').Router();
const { Post, Comment, User } = require('../models');

// router.get('/', async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       include: [
//         {
//           model: Post,
//           attributes: ['title', 'content'],
//         },
//       ],
//     });

//     const users = userData.map((user) =>
//       user.get({ plain: true })
//     );

//     console.log({users});

//     res.render('homepage', {
//       users,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const posts = postData.map((post) =>
        post.get({ plain: true })
      );
  
      console.log({posts});
  
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;