const express = require("express");
const router = express.Router();

const { chat } = require("../services/openrouter");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await chat(message);

    res.json({
      success: true,
      reply
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "AI request failed"
    });
  }
});

module.exports = router;
