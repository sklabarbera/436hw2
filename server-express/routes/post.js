const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const { ObjectId } = require('mongodb')
const privateKey = "";

router.use(function (req, res, next) {
if (req.header("Authorization")) {
    try {
            req.payload = jwt.verify(req.header("Authorization"), privateKey, {
            algorithms: ["RS256"],
        });
        next();
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    } else {
        return res.status(401).json({error: "Authorization header missing."});
    }
});

router.post("/", async function (req, res) {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        complete: req.body.complete,
        dateCompleted: req.body.dateCompleted,
        author: req.payload.id,
    });
    return post
        .save()
        .then((savedPost) => {
            return res.status(201).json({
                id: savedPost._id,
                title: savedPost.title,
                description: req.body.description,
                complete: req.body.complete,
                dateCompleted: req.body.dateCompleted,
                author: savedPost.author,
            });
        })
    .catch((error) => {
    return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res) {
    Post.find()
      .where("author")
      .equals(req.payload.id)
      .then((posts) => {
        return res.status(200).json(posts);
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  });

  router.patch("/:id", async (req, res) => {
    Post.db.collection("posts")
    .updateOne({_id: new ObjectId(req.body.id)}, {$set: { complete: req.body.complete, dateCompleted: req.body.dateCompleted }})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: "could not update"})
    })
  })

  router.get('/:id', (req, res) => {

    if (req.body.id) {
  
      db.collection('posts')
        .findOne({_id: new ObjectId(req.body.id)})
        .then(doc => {
          res.status(200).json(doc)
        })
        .catch(err => {
          res.status(500).json({error: 'Could not fetch the document'})
        })
        
    } else {
      res.status(500).json({error: 'Could not fetch the document'})
    }

})

  router.delete('/:id', (req, res, next) => {
    Post.deleteOne({_id: new ObjectId(req.body.id)}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
  
module.exports = router;