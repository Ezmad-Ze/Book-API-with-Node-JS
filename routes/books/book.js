const express = require("express");
const {
  getAllBooks,
  createBook,
  testUpload,
} = require("../../controllers/booksController/booksController");
const uploads = require("../../middleware/upload");
const router = express.Router();

router.route("/").get(getAllBooks).post(uploads, createBook);
router.route("/test").post(uploads, testUpload);

module.exports = router;
