const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/products");
const userRouter = require("./routes/user");
require("dotenv").config();
const cors = require("cors");

const app = express();

//connecting to the modgodb database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Database connection is successful!"))
  .catch((err) => console.log(err));

// setup our server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// middlewars
app.use(cors());
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/user", userRouter);
