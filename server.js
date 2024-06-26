const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

// rest object
const app = express();

// configuration for .env file (hire no config because file is in root folder)
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

//for Router
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const resturantRoutes = require("./routes/resturantRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/resturant", resturantRoutes);
app.use("api/v1/category", categoryRoutes);
app.use("api/v1/food", require("./routes/foodRoutes"));

//mongoDb connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connectes successfully");
  })
  .catch((err) => {
    console.log("Connection failed");
  });

//PORT
const PORT = process.env.PORT;

//listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
