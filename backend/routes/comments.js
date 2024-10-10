const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const withAuth = require("../middleware/authMiddleware");
const secretKey = "YourSecretKey";

const Comments = require("../models/commentsModel");
const Papers = require("../models/paperModel")
const axios = require("axios");

router.post("/add",withAuth, async (req, res) => {
  console.log("add api called!!");
    const {emailId, paperId, comment, category } = req.body;

    const categoryArray = category.split(" ");

    const newComment = await Comments.create({
      paperId: paperId,
      categories: categoryArray,
      emailId: emailId,
      comment: comment,
    });
    return res.status(200).json(newComment);
  
});


router.get("/get",withAuth, async (req, res) => {
    console.log("get api called!!");
    const token = req.cookies.token;
    var user;
          jwt.verify(token, secretKey, function (err, decoded) {
          if (err) {
              res.status(401).send("Unauthorized: Invalid token");
          } 
          else {
              console.log(decoded.user.emailId);
              user = decoded.user.emailId;
              console.log(user)
              
              // next();
          }
          });
    console.log("hiii")
  
    const { categories } = req.body;

    const categoryArray = categories.split(" ");
    console.log("hiii")
    var commentsList;
    
    Comments.find({ emailId: user, categories: { $in: categoryArray } })
    .then(comments => {
        commentsList = comments
      const paperIds = comments.map(comment => comment.paperId);
  
      return Papers.find({ id: { $in: paperIds } });
    })
    .then(papers => {
      return res.status(200).json({ commentsList, papers });
    })
    .catch(err => {
      return res.status(500).json({ error: err.message });
    });
    
  });

  router.delete("/delete", async (req, res) => {
    try {
      // Extract data from the request body
      const { emailId, commentText } = req.body;
      console.log(emailId);
      console.log(commentText);
      // Validate that both emailId and commentText are provided
      if (!emailId || !commentText) {
        return res.status(400).json({ error: "Both emailId and commentText are required." });
      }
  
      // Find and delete the comment based on emailId and commentText
      const result = await Comments.deleteOne({ emailId, comment: commentText });
  
      // Check if the comment was found and deleted
      if (result.deletedCount > 0) {
        return res.status(200).json({ message: "Comment deleted successfully." });
      } else {
        return res.status(404).json({ error: "Comment not found." });
      }
    } 
    catch (error) {
      console.error("Error:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  router.put("/update", async (req, res) => {
    try {
      console.log("update api called");
      // Extract data from the request body
      const { emailId, commentText, updatedCommentText } = req.body;
      console.log(emailId);
      console.log(commentText);
      console.log(updatedCommentText);
      
      // Validate that both emailId and commentText are provided
      if (!emailId || !commentText || !updatedCommentText) {
        return res.status(400).json({ error: "emailId, commentText, and updatedCommentText are required." });
      }
  
      // Find and update the comment based on emailId and commentText
      const result = await Comments.updateOne({ emailId, comment: commentText }, { comment: updatedCommentText });
      console.log("hi")
      // Check if the comment was found and updated
    

      return res.status(200).json({ message: "Comment updated successfully." });
   
      
    } catch (error) {
      console.error("Error:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
module.exports = router;
