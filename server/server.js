const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const controller = require("./controller");
const cors = require("cors");

//////Middleware//////////

app.use(express.json());
app.use(cors());

///////////API'S///////

app.post("/formMaster", controller.buildForm);
app.get("/getCretedForm", controller.getForms);
app.delete("/deleteForm/:id", controller.deleteForm);
app.get("/getForm/:id", controller.getForm);
app.post("/createForm", controller.createForm);

//////DB Connection//////////

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
