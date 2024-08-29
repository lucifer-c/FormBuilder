const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const controller = require("./controller");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   console.log("path:" + req.path + "method:" + req.method);
//   next();
// });

app.post("/formMaster", controller.buildForm);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("the app is working on", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
