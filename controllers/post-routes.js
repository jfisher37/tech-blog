const router = require('express').Router();
const { Post, User, Comment } = require('../models');



router.get('/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            attributes: ['content', 'date_created'],
          },
          {
            model: User,
            attributes: ['name'],
          },
        ],
      }
      );
      let posts;
      if(postData.length){
      posts = postData.map((post) =>
        post.get({ plain: true })
      );
      } else {
      posts = postData.get({ plain: true });
      }
      console.log({posts});
  
      res.render('post', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//   router.post('/:id', async (req, res) => {
//     try {
//        await Post.create({
//         title: req.body.title,
//         content: req.body.content,
//         user_id: req.session.user_id,
//       });
//       console.log("new post added");
//       res.status(200).json("hey");
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });

module.exports = router;