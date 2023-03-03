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

/**
 * @openapi
 * '/api/v1/book':
 *  get:
 *   tags:
 *    - Book
 *   summary: Get All Books
 *   responses:
 *     204:
 *       description: Information
 *     400:
 *       description: Bad Request
 *  post:
 *   tags:
 *    - Book
 *   summary: Create new book
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Book'
 *   responses:
 *     200:
 *       description: Success
 *       contents:
 *         application/json:
 *         schema:
 *           $ref: '#/components/schemas/CreateBookResponse'
 *     400:
 *       description: Bad Request
 *
 */

router.route("/").get(getAllBooks).post(uploads, createBook);

/**
 * @openapi
 * '/api/v1/book/{bookId}':
 *  get:
 *   tags:
 *    - Book
 *   summary: Get a single product using ID
 *   parameters:
 *    - name: bookId
 *      in: path
 *      description: The ID of the book
 *      required: true
 *   responses:
 *     200:
 *       description: Success
 *       contents:
 *         application/json:
 *         schema:
 *           $ref: '#/components/schemas/Book'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     404:
 *       description: Book not found
 *  delete:
 *   tags:
 *    - Book
 *   summary: Get a single product using ID
 *   parameters:
 *    - name: bookId
 *      in: path
 *      description: The ID of the book
 *      required: true
 *   responses:
 *     200:
 *       description: Success
 *       contents:
 *         application/json:
 *         schema:
 *           $ref: '#/components/schemas/Book'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     404:
 *       description: Book not found
 *  put:
 *   tags:
 *    - Book
 *   summary: Get a single product using ID
 *   parameters:
 *    - name: bookId
 *      in: path
 *      description: The ID of the book
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Book'  
 *   responses:
 *     200:
 *       description: Success
 *       contents:
 *         application/json:
 *         schema:
 *           $ref: '#/components/schemas/CreateBookResponse'
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     404:
 *       description: Book not found
 *
 */

router.route("/:id").get(getBook).delete(deleteBook).put(uploads, updateBook);

module.exports = router;