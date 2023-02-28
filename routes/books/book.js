const express = require("express");
const {
  getAllBooks,
  createBook,
  testUpload,
  getBook,
  deleteBook,
} = require("../../controllers/booksController/booksController");
const uploads = require("../../middleware/upload");
const router = express.Router();

router.route("/").get(getAllBooks).post(uploads, createBook);
router.route("/:id").get(getBook).delete(deleteBook);
router.route("/test").post(uploads, testUpload);

module.exports = router;
