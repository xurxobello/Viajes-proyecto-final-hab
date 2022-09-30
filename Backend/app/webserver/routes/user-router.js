"use strict";

const express = require("express");
const multer = require("multer");
const checkAccountSession = require("../controllers/account/check-acount-session");
const detailUser = require("../controllers/user/get-user-logged-detail-controller");
const uploadAvatar = require("../controllers/user/upload-avatar-controller");
const updateUser = require("../controllers/user/update-user-controller");
const updateUserAboutMe = require("../controllers/user/update-user-about-me-controller");
const detailAnyUser = require("../controllers/user/get-user-detail-controller");

const upload = multer();

const router = express.Router();

router.post(
  "/users/avatar",
  checkAccountSession,
  upload.single("avatar"),
  uploadAvatar
);
router.put("/users/update", checkAccountSession, updateUser);
router.put("/users/updateAboutMe", checkAccountSession, updateUserAboutMe);
router.get("/users/detail", checkAccountSession, detailUser);
router.get("/users/detail/:id", detailAnyUser);

module.exports = router;
