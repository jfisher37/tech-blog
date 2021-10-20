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
            include: [User],
            attributes: ['content', 'date_created', 'user_id', 'id'],
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
  
      const commentIdArr = [];
      if(posts.comments.length){
      for (let i = 0; i < posts.comments.length; i++){
        commentIdArr.push(posts.comments[i].user_id);
      }}
console.log(commentIdArr);

      let ownedPost = false;
      if (req.session.user_id === posts.user_id){
        ownedPost = true
      } ;


      res.render('post', {
        posts,
        loggedIn: req.session.loggedIn,
        ownedPost,
        // ids: commentIdArr,
      });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
    
  router.put('/:id', async (req, res) => {
    try {
       await Post.update({
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
      );
      console.log("post updated");
      res.status(200).json("hey");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
       await Post.destroy(
      {
        where: {
          id: req.params.id,
        },
      }
      );
      console.log("post deleted");
      res.status(200).json("hey");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.post('/:id', async (req, res) => {
    try {
       await Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
        post_id: req.params.id
      });
      console.log("new comment added");
      res.status(200).json("hey");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.put('/comment/:id', async (req, res) => {
    try {
       await Comment.update({
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
      );
      console.log("comment updated");
      res.status(200).json("hey");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;