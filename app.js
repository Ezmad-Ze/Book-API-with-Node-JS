require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = require("./config/corsOptions");
//handle options credentials check - before CORS
//and fetch cookies credentials requirment
app.use(require("./middleware/credentials"));
app.use(cors(corsOptions));

//jwt middleware
const verifyJWT = require("./middleware/verifyJWT");

//for cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("./uploads"));

//database
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

//connect to database
connectDB();

//JSON middleware
app.use(express.json());

//assign port
const PORT = process.env.PORT || 3500;

//first page
app.get("/", (req, res) => {
  res.send("<h1>Testing</h1>");
});

//routes
app.use("/api/v1/register", require("./routes/auth/register"));
app.use("/api/v1/login", require("./routes/auth/login"));
app.use("/api/v1/refresh", require("./routes/auth/refresh"));
app.use("/api/v1/logout", require("./routes/auth/logout"));

app.use(verifyJWT);
app.use("/api/v1/book", require("./routes/books/book"));

//Not found error
app.use(require("./middleware/not-found"));
app.use(require("./middleware/errorHandler"));

//listen to server
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}...`);
  });
});
