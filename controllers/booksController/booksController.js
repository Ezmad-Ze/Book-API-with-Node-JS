const { BadRequestError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");
const Book = require("../../models/Book");

const getAllBooks = async (req, res) => {
  res.send("Helloe");
};

const createBook = async (req, res) => {
  let {
    isbn,
    title,
    image,
    description,
    author,
    categories,
    status,
    createdBy,
  } = req.body;
  //assigning user
  createdBy = req.id;
  //checking if title is not empty
  if (!title) throw new BadRequestError("Title is Required");

  const result = await Book.create({
    isbn,
    title,
    image,
    description,
    author,
    categories,
    status,
    createdBy,
  });

  res.status(StatusCodes.CREATED).json(result);
};

module.exports = {
  getAllBooks,
  createBook,
};
