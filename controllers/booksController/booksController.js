const { BadRequestError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");
const Book = require("../../models/Book");

const getAllBooks = async (req, res) => {
  const { title, author, status, categories, sort } = req.query;
  const bookStatus = ["TBR", "READING", "FINISHED"];
  const queryObject = {};

  if (title) queryObject.title = { $regex: title, $options: "i" };
  if (author) queryObject.author = { $regex: author, $options: "i" };
  if (categories)
    queryObject.categories = { $regex: categories, $options: "i" };

  if (bookStatus.includes(status?.toUpperCase())) {
    queryObject.status = status?.toUpperCase();
  }

  //created by only the same user
  queryObject.createdBy = req.id;
  
  let result = Book.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  const books = await result;
  res.status(StatusCodes.OK).json({ nbHits: books.length, books });
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
  //checking if image has value or not
  if (req.file) {
    image = req.file.path;
  }
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

const testUpload = async (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send({ message: "Select image to upload" });
  }

  res.status(200).json(req.file.path);
};

module.exports = {
  getAllBooks,
  createBook,
  testUpload,
};
