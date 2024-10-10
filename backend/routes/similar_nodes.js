const express = require("express");
const router = express.Router();

const Paper = require("../models/paperModel");
// const { recommendations } = require("./recommandations");

const axios = require('axios');
const withAuth = require("../middleware/authMiddleware");

router.get("/:text", withAuth, async (req, res) => {
    console.log("api called!!")
    try {
        const given = req.params.text;
        const response = await axios.post('http://127.0.0.1:5000/similar_nodes', {
            "nodes": given
        }, 
        );
        const nodes = response.data;
        console.log(nodes)
        // const similarPapers = await Paper.find({ id: { $in: recommendedIds } });

        return res.status(200).json({ nodes: nodes })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;