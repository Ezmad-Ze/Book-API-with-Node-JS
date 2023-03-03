const { BadRequestError, NotFoundError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");
const { createFile } = require("../../middleware/upload");
const Book = require("../../models/Book");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const getAllBooks = async (req, res) => {
  const { title, author, status, categories, sort } = req.query;
  const bookStatus = ["TBR", "READING", "FINISHED"];
  const queryObject = {};

  if (title) queryObject.title = { $regex: title, $options: "i" };
  if (author) queryObject.author = { $regex: author, $options: "i" };

  if (categories)
    queryObject.categories = { $regex: categories, $options: "i" };

  if (bookStatus.includes(status?.toUpperCase()) && status !== "all") {
    queryObject.status = status?.toUpperCase();
  }

  //created by only the same user
  queryObject.createdBy = req.id;

  let result = Book.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  const books = await result;
  res.status(StatusCodes.OK).json({ nbHits: books.length, books });
};

const createBook = async (req, res) => {
  //to create the uploads folder
  createFile();

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

const updateBook = async (req, res) => {
  if (!req.params.id) throw new BadRequestError("ID is required");

  let { isbn, title, image, description, author, categories, status } =
    req.body;

  //checking if image has value or not
  if (req.file) {
    image = req.file.path;
  }

  //to find the previous value
  const prevBook = await Book.findOne({
    _id: req.params.id,
    createdBy: req.id,
  });

  //update the value
  const findBook = await Book.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.id },
    { isbn, title, image, description, author, categories, status },
    { new: true, runValidators: true }
  );

  if (!findBook) {
    throw new NotFoundError(`No job with id ${req.params.id}`);
  } else {
    //delete file from the file system
    if (
      fs.existsSync(path.join(prevBook.image)) &&
      prevBook.image !== "uploads\\book_cover.png" &&
      prevBook.image !== findBook.image
    ) {
      console.log(prevBook.image);
      console.log(findBook.image);
      await fsPromises.unlink(path.join(prevBook.image));
    }
  }

  res.status(StatusCodes.OK).json({ findBook });
};

const deleteBook = async (req, res) => {
  if (!req.params.id) throw new BadRequestError("ID is required");

  const findBook = await Book.findOneAndRemove({
    _id: req.params.id,
    createdBy: req.id,
  });
  if (!findBook)
    throw new NotFoundError(`No Book found with ID ${req.params.id}`);
  else {
    //delete file from the file system
    if (
      fs.existsSync(path.join(findBook.image)) &&
      findBook.image !== "uploads\\book_cover.png"
    ) {
      await fsPromises.unlink(path.join(findBook.image));
    }
  }

  res.status(StatusCodes.OK).send();
};

const getBook = async (req, res) => {
  if (!req.params.id) throw new BadRequestError("ID is required");

  const findBook = await Book.findOne({
    _id: req.params.id,
    // createdBy: req.id,
  }).exec();

  if (!findBook)
    throw new NotFoundError(`No Book found with ID ${req.params.id}`);

  res.status(StatusCodes.OK).json(findBook);
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBook,
};
