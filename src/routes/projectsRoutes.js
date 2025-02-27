"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var projectsController_js_1 = require("../controllers/projectsController.js");
var router = (0, express_1.Router)();
// Define routes for projects
router.get("/", function (req, res) {
  projectsController_js_1.default.getProjects(req, res);
});
exports.default = router;
