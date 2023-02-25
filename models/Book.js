const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    isbn: { type: String },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "uploads/book_cover.png",
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
