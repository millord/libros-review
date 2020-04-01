const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

// init the app
const app = express();

//middlewares
app.use(morgan("tiny"));
app.use(express.json());

// routes middlewares
app.use("/api/v1/auth", authRoutes);

// connect the db
mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log(`DB running properly`)
);

// listen the server
app.listen(process.env.PORT, () =>
  console.log(`Server up and running on port ${process.env.PORT}`)
);
