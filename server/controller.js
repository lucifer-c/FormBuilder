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

exports.getForms = async function (req, res) {
  try {
    // Fetch all documents from the formMaster collection
    const forms = await formMaster.find();

    // Return the fetched forms in the response
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
