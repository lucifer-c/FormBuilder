const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },

  fields: [
    {
      inputType: String,
      inputType: String,
    },
  ],
});

const UserData = mongoose.model("UserData", UserDataSchema);
module.exports = UserData;
