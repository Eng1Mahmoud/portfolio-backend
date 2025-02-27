"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var db_js_1 = require("./config/db.js");
var profileRoutes_js_1 = require("./routes/profileRoutes.js");
var skillsRoutes_js_1 = require("./routes/skillsRoutes.js");
var projectsRoutes_js_1 = require("./routes/projectsRoutes.js");
var uploadRoutes_js_1 = require("./routes/uploadRoutes.js");
var authRoutes_js_1 = require("./routes/authRoutes.js");
dotenv_1.default.config();
// Create Express server
var app = (0, express_1.default)();
// Connect to MongoDB
await (0, db_js_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.get("/", function (req, res) {
  res.send("Hello from TypeScript Express!");
});
console.log("test");
app.use("/api/auth", authRoutes_js_1.default);
app.use("/api/profile", profileRoutes_js_1.default);
app.use("/api/skills", skillsRoutes_js_1.default);
app.use("/api/projects", projectsRoutes_js_1.default);
app.use("/api/upload", uploadRoutes_js_1.default);
// Start the Express server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server is running on http://localhost:".concat(port));
});
exports.default = app;
