const formMaster = require("./model/FormMaster");

exports.buildForm = async function (req, res) {
  try {
    const { title, form } = req.body;

    const newForm = new formMaster({
      title: title,
      fields: form,
    });

    const savedForm = await newForm.save();

    res.status(201).json(savedForm);
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).json({ message: "Server error" });
  }
};
