"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = require("multer");
var upload = (0, multer_1.default)({
  storage: multer_1.default.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
exports.default = upload;
