const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const withAuth = require("../middleware/authMiddleware");
const usersBookmark = require("../models/usersBookmark");
const papers = require("../models/paperModel");
const Comments = require("../models/commentsModel")
router.post("/add", async (req, res) => {

  const {emailId, paperId } = req.body;
  console.log(paperId);

  usersBookmark
    .findOne({ emailId: emailId })
    .then((foundUser) => {
      if (foundUser) {
        foundUser.paperId.push(paperId);
        return foundUser.save();
      } else {
        const newBookmark = new usersBookmark({
          emailId: emailId,
          paperId: [paperId],
        });
        return newBookmark.save();
      }
    })
    .then((savedUser) => {
      console.log("User bookmarked paper:", savedUser);
    })
    .catch((error) => {
      console.error(error);
    });

  // console.log(newComment);

  return res.status(200).json({ msg: "bookmark added!" });
});

router.get("/get/:emailId", async (req, res) => {
  // console.log("email:",req.params.emailId);
  usersBookmark
    .findOne({ emailId: req.params.emailId })
    .then((foundUser) => {
      // console.log(foundUser);
      if (foundUser) {
        // console.log("in if");
        return papers.find({ id: { $in: foundUser.paperId } });
      } else {
        return [];
      }
    })
    .then((papersArray) => {
      // console.log("in return ");
      // console.log(papersArray);
      res.status(200).json(papersArray);
    })
    .catch((error) => {
      // console.error(error);
      res.status(500).json({ error: "An error occurred" });
    });
});

router.get("/get/:emailId/:paperId", async (req, res) => {
  const emailId = req.params.emailId;
  const paperId = req.params.paperId;
  console.log("get bookmark called:")
  // console.log(emailId);
  // console.log(paperId);
  try {
    // Find user's bookmarks
    const foundUser = await usersBookmark.findOne({ emailId });

    if (foundUser) {
      // Check if the paperId is in the user's bookmarks
      if (foundUser.paperId.includes(paperId)) {
        // If paperId is found, fetch paper details
        const paper = await papers.findOne({ id: paperId });
        // console.log(paper);
        // Fetch comments for the specific paper
        var comments = await Comments.find({ paperId, emailId });
        // console.log(comments);
        const ans = [];
        for (const commentObject of comments) {
          ans.push(commentObject.comment);
        } 
        console.log(ans);
        // if(comments == null) comments = []
        // Return both paper and comments
        res.status(200).json({ paper, comments: ans });
      } else {
        // If paperId is not found in user's bookmarks, return an empty array
        res.status(200).json({ paper: null, comments: [] });
      }
    } else {
      // If user is not found, return an empty array
      res.status(200).json({ paper: null, comments: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});


router.post("/delete", async (req, res) => {
  console.log("delete api called!!");
  const {emailId, paperId } = req.body;
  console.log(emailId,paperId)
  usersBookmark.updateOne({ "emailId": emailId }, { $pull: { "paperId": paperId } })
  .then((result) => {
    console.log(result)
    if (result.modifiedCount > 0) {
      console.log(`Paper with ID ${paperId} was removed from bookmarks.`);
      res.status(200).json({ message: 'Paper removed from bookmarks' });
    } 
    else {
      console.log(`Paper with ID ${paperId} was not found in the user's bookmarks.`);
      res.status(404).json({ message: 'Paper not found in bookmarks' });
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  });
});

module.exports = router;
