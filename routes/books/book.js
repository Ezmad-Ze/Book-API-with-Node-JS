const express = require("express");
const {
  getAllBooks,
  createBook,
} = require("../../controllers/booksController/booksController");
const router = express.Router();

router.route("/").get(getAllBooks).post(createBook);

module.exports = router;
