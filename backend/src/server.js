const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { initDB } = require("./database/db");

const healthRoute = require("./routes/health");
const chatRoute = require("./routes/chat");
const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoute);
app.use("/api/chat", chatRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.json({
    app: "Mimo Partner API",
    status: "Running",
    version: "1.0.0"
  });
});

const PORT = process.env.PORT || 5000;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Mimo Partner API running on port ${PORT}`);
  });
});
