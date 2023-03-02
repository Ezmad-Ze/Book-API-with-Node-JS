const express = require("express");
const {
  getAllBooks,
  createBook,
  getBook,
  deleteBook,
  updateBook,
} = require("../../controllers/booksController/booksController");
const { uploads } = require("../../middleware/upload");
const router = express.Router();

router.route("/").get(getAllBooks).post(uploads, createBook);
router.route("/:id").get(getBook).delete(deleteBook).put(uploads, updateBook);

module.exports = router;
