const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");

const db = require("../models"); // Sequelize Index.js

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Connect & Sync DB
db.sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database Connected Successfully");

    // Sync tables
    return db.sequelize.sync(); // ←⭐ ADD THIS
  })
  .then(() => {
    console.log("🗂️ Tables synced successfully");
  })
  .catch((err) => console.error("❌ DB Error:", err));

app.listen(process.env.PORT, () => {
  console.log("🚀 Server running on port " + process.env.PORT);
});
