const formMaster = require("./model/FormMaster");
const UserData = require("./model/userData");

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

exports.getForms = async function (req, res) {
  try {
    const forms = await formMaster.find();

    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteForm = async function (req, res) {
  try {
    const { id } = req.params;
    const deletedForm = await formMaster.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getForm = async function (req, res) {
  try {
    const { id } = req.params;
    const form = await formMaster.findById(id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createForm = async function (req, res) {
  const { title, fields } = req.body;

  try {
    const newForm = new UserData({
      title,
      fields: fields.map((field) => ({
        inputTitle: field.inputTitle,
        inputType: field.inputType,
        inputValue: field.inputValue || "",
      })),
    });

    const savedForm = await newForm.save();
    res.send(savedForm);
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).send("Server error");
  }
};
