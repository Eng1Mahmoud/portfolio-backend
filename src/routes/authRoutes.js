"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_js_1 = require("../controllers/authController.js");
var router = (0, express_1.Router)();
router.post("/register", function (req, res) {
  authController_js_1.default.register(req, res);
});
router.post("/login", function (req, res) {
  authController_js_1.default.login(req, res);
});
exports.default = router;
