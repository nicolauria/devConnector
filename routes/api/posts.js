const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const passport = require("passport");
// const validatePostInput = require("../../validation/post");
const auth = require("../../middleware/auth");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that id" })
    );
});

// @route   POST api/posts
// @desc    Create a new post
// @access  Private
router.post("/", auth, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
  });

  newPost.save().then((post) => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      Post.findById(req.params.id).then((post) => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        post.remove().then(() => res.json({ success: true }));
      });
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
});

// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  Private
router.post("/like/:id", auth, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ alreadyliked: "Post already liked" });
      }
      post.likes.unshift({ user: req.user.id });
      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ nopost: "No post with that id" }));
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.post("/unlike/:id", auth, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ notliked: "You have not liked this post" });
      }
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ nopost: "No post with that id" }));
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post("/comment/:id", auth, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then((post) => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
});

// @route   POST api/posts/like/:postId/:commentId
// @desc    Like a comment
// @access  Private
router.post("/like/:postId/:commentId", auth, (req, res) => {
  Post.findById(req.params.postId)
    .then((post) => {
      const comment = post.comments.filter(
        (el) => el._id.toString() === req.params.commentId
      )[0];
      if (
        comment.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ alreadyliked: "Comment already liked" });
      }
      comment.likes.unshift({ user: req.user.id });
      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ nopost: "No post with that id" }));
});

// @route   POST api/posts/unlike/:postId/:commentId
// @desc    Unlike a comment
// @access  Private
router.post("/unlike/:postId/:commentId", auth, (req, res) => {
  Post.findById(req.params.postId)
    .then((post) => {
      const comment = post.comments.filter(
        (el) => el._id.toString() === req.params.commentId
      )[0];
      if (
        comment.likes.filter((like) => like.user.toString() === req.user.id)
          .length < 1
      ) {
        return res.status(400).json({ notliked: "Comment has not been liked" });
      }
      const removeIndex = comment.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      comment.likes.splice(removeIndex, 1);
      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ nopost: "No post with that id" }));
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Add comment to post
// @access  Private
router.delete("/comment/:id/:comment_id", auth, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      const removeIndex = post.comments
        .map((comment) => comment.id)
        .indexOf(req.params.comment_id);
      if (removeIndex === -1)
        return res.status(400).json({
          commentNotFound: "Comment not found",
        });
      post.comments.splice(removeIndex, 1);
      post.save().then((post = res.json(post)));
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
});

module.exports = router;
