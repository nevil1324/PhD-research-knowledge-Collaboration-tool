const express = require("express");
const router = express.Router();

const Paper = require("../models/paperModel");
// const { recommendations } = require("./recommandations");

const axios = require('axios');
const withAuth = require("../middleware/authMiddleware");

router.get("/:text", withAuth, async (req, res) => {
    console.log("api called!!")
    try {
        const searchText = req.params.text;
        const response = await axios.post('http://127.0.0.1:5000/searching', {
            "searchText": searchText
        }, 
        );
        const recommendedIds = response.data;
        console.log(recommendedIds)
        const similarPapers = await Paper.find({ id: { $in: recommendedIds } });

        return res.status(200).json({ papers: similarPapers })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;