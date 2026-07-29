const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  res.json({
    success: true,
    reply: `You said: ${message}`,
    ai: "Mimo Partner"
  });
});

module.exports = router;
