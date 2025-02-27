"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var skillsController_js_1 = require("../controllers/skillsController.js");
var router = (0, express_1.Router)();
// Define routes for skills
router.get("/", function (req, res) {
  skillsController_js_1.default.getSkills(req, res);
});
exports.default = router;
