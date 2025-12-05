const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");

const db = require("../models");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// DB Connect + Sync
db.sequelize.authenticate()
  .then(() => console.log("✅ DB connected"))
  .then(() => db.sequelize.sync())
  .then(() => console.log("🗂️ Tables synced"))
  .catch(err => console.log("❌ DB Error:", err));

app.listen(process.env.PORT, () =>
  console.log("🚀 Server running on " + process.env.PORT)
);
