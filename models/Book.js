const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *  schemas:
 *    Book:
 *      type: object
 *      required:
 *        - title
 *      properties:
 *        isbn:
 *          type: string
 *        title:
 *          type: string
 *          default: The Book Title
 *        image:
 *          type: string
 *          default: uploads\book_cover.png
 *        description:
 *          type: string
 *        author:
 *          type: string
 *        categories:
 *          type: string
 *        status:
 *          type: string
 *          default: TBR
 *    CreateBookResponse:
 *      type: object
 *      properties:
 *        isbn:
 *          type: string
 *        title:
 *          type: string
 *        image:
 *          type: string
 *        description:
 *          type: string
 *        categories:
 *          type: string
 *        status:
 *          type: string
 */

const bookSchema = new Schema(
  {
    isbn: { type: String },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "uploads\\book_cover.png",
    },
    description: {
      type: String,
    },
    author: [String],
    categories: [String],
    status: {
      type: String,
      enum: ["TBR", "READING", "FINISHED"],
      default: "TBR",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
