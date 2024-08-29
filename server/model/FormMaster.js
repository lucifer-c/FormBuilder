const mongoose = require("mongoose");

const FormMaster = new mongoose.Schema({
  title: { type: String, required: true, index: true },

  fields: [
    {
      inputTitle: String,
      inputType: String,
    },
  ],
});

const Form = mongoose.model("FormMaster", FormMaster);
module.exports = Form;
