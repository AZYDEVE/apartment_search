const { query } = require("express");
const express = require("express");
const router = express.Router();
const mongodb = require("../db/mongodb");

/* get all the apartment post */
router.post("/get_all_posts", async function (req, res) {
  const data = await mongodb.getData("apartment", "postings", req.body);
  res.json(data);
});

router.post("/add_like_by_user", async function (req, res) {
  const user = req.user.username;
  const likedPost = req.body.postId;
  const query = { username: user };
  const updateValue = { $addToSet: { liked: likedPost } };

  mongodb.updateData("apartment", "liked", query, updateValue);
});

router.post("/remove_like_by_user", async function (req, res) {
  const user = req.user.username;
  const likedPost = req.body.postId;
  const query = { username: user };
  const updateValue = { $pull: { liked: likedPost } };

  mongodb.updateData("apartment", "liked", query, updateValue);
});

router.post("/check_user_liked_post", async function (req, res) {
  const likedPost = await mongodb.getData("apartment", "liked", {
    username: req.user.username,
  });

  const ListOfLiked = likedPost[0];

  for (let i = 0; i < ListOfLiked.liked.length; i++) {
    if (ListOfLiked.liked[i] == req.body.postId) {
      res.json({ result: true });
      return;
    }
  }
  res.json({ result: false });
});

router.get("/get_liked_posts", async function (req, res) {
  const allthelike = await mongodb.getData("apartment", "liked", {
    username: req.user.username,
  });

  const allPost = await mongodb.getData("apartment", "postings", {});

  const like = allthelike[0].liked;
  console.log(like);
  const temp = [];
  for (let i = 0; i < allPost.length; i++) {
    const postid = allPost[i]._id;
    for (let b = 0; b < like.length; b++) {
      const likeid = like[b];

      if (postid == likeid) {
        temp.push(allPost[i]);
      }
    }
  }

  res.json(temp);
});

router.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
