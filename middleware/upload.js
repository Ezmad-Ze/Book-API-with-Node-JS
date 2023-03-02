const path = require("path");
const multer = require("multer");
const util = require("util");
const fs = require("fs");
const fsPromises = require("fs").promises;

const FILE_SIZE = 1024 * 1024;

const createFile = async () => {
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "uploads"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "uploads"));
    }
    await fsPromises.copyFile(
      path.join(__dirname, "..", "book_cover.png"),
      path.join(__dirname, "..", "uploads", "book_cover.png")
    );
  } catch (err) {
    console.error(err);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    createFile();
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    let filename =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const uploads = multer({
  storage: storage,
  limits: {
    fileSize: FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Image type should be: .jpeg, .jpg and .png!"));
    }
  },
}).single("image");

module.exports = { uploads, createFile };
