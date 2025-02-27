"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var profileController_js_1 = require("../controllers/profileController.js");
var router = (0, express_1.Router)();
// Use the imported controller instance directly
router.post("/", function (req, res) {
  profileController_js_1.default.createProfile(req, res);
});
exports.default = router;
