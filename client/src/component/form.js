import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../App.css";

const Form = () => {
  const navigate = useNavigate();

  const [showTextField, setShowTextField] = useState(false);
  const [title, setTitle] = useState("Untitled"); // State for the first box title
  const [showInputTypes, setShowInputTypes] = useState(false); // State for showing input type buttons
  const [showFields, setShowFields] = useState(false); // State to toggle fields visibility
  const [fields, setFields] = useState([]); // State to manage fields
  const [form, setForm] = useState([]); // State to store the form data with inputType and inputTitle
  const [selectedFieldType, setSelectedFieldType] = useState("");
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null); // Track which field is being edited
  const [editShowFields, setEditShowFields] = useState(false);

  const handleEditClick = () => {
    if (title === "Untitled") {
      setTitle("");
    }
    setShowTextField(true);
  };

  const handleTitleChange = (event) => {
    const newValue = event.target.value;
    setTitle(newValue); // Update the title in the first box as input value changes
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (selectedFieldIndex !== null) {
      // Update the form state directly
      const updatedForm = form.map((item, index) =>
        index === selectedFieldIndex ? { ...item, inputTitle: value } : item
      );
      setForm(updatedForm);

      // Update the fields state to reflect the new value
      const updatedFields = fields.map((field, index) =>
        index === selectedFieldIndex ? { ...field, value } : field
      );
      setFields(updatedFields);
    }
  };

  const handleCreateFormClick = async () => {
    console.log("payload---->", title, form);

    try {
      const res = await axios.post("/formMaster", {
        title,
        form,
      });

      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error Building form:", error);
    }
  };

  const handleAddInputClick = () => {
    setShowFields(!showFields); // Toggle fields visibility
    if (!showFields) {
      setShowInputTypes(true); // Show input type buttons when opening fields
    } else {
      setShowInputTypes(false); // Hide input type buttons when closing fields
    }
  };

  const handleInputTypeClick = (type) => {
    if (fields.length >= 20) {
      alert("Only 20 fields are allowed.");
      return;
    }
    const newField = { type, value: "" };
    setFields([...fields, newField]); // Add new field to the list

    // Update the form state with the new field
    setForm([...form, { inputType: type, inputTitle: "" }]);
  };

  const handleFieldEdit = (index) => {
    const fieldType = fields[index].type;
    setSelectedFieldType(fieldType);
    setSelectedFieldIndex(index);
    setShowTextField(false);
    setEditShowFields(true);
  };

  const handleFieldDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields); // Remove field at index

    const updatedForm = form.filter((_, i) => i !== index);
    setForm(updatedForm); // Remove corresponding form data
  };

  return (
    <div className="appContainer">
      <div className="appTitle">
        <h1>Create New Form</h1>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* First Box */}
        <div className="box">
          <h2>
            {title}
            <span className="editIcon" onClick={handleEditClick}>
              ✏️ {/* Simple edit icon using emoji */}
            </span>
          </h2>
          {/* Render fields dynamically */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexWrap: "wrap", // Allow wrapping of fields
              gap: "10px", // Add space between the fields
            }}
          >
            {fields.map((field, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 calc(50% - 10px)", // Two columns with spacing
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  name={field.type.toLowerCase()}
                  placeholder="Title"
                  value={field.value} // Set the input field value
                  readOnly // This makes the input field read-only
                  style={{
                    flex: "1", // Take up available space within the column
                  }}
                />
                <span
                  onClick={() => handleFieldEdit(index)}
                  style={{ marginLeft: "5px" }}
                >
                  ✏️ {/* Simple edit icon using emoji */}
                </span>
                <span
                  onClick={() => handleFieldDelete(index)}
                  style={{ marginLeft: "5px" }}
                >
                  X {/* Simple delete icon using emoji */}
                </span>
              </div>
            ))}
          </div>
          <div>
            <button onClick={handleAddInputClick}>
              {showFields ? "Close Add Input" : "Add Input"}
            </button>
          </div>
          {/* Render dynamically created input type buttons in the first box */}
          {showFields && showInputTypes && (
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                display: "flex",
                gap: "10px",
              }}
            >
              <button onClick={() => handleInputTypeClick("Text")}>Text</button>
              <button onClick={() => handleInputTypeClick("Number")}>
                Number
              </button>
              <button onClick={() => handleInputTypeClick("Email")}>
                Email
              </button>
              <button onClick={() => handleInputTypeClick("Password")}>
                Password
              </button>
              <button onClick={() => handleInputTypeClick("Date")}>Date</button>
            </div>
          )}

          <div style={{ marginTop: "10px" }}>
            <button onClick={handleCreateFormClick}>Submit</button>
          </div>
        </div>

        {/* Second Box */}
        <div className="box">
          <h2>Form Editor</h2>
          {showTextField ? (
            <input
              type="text"
              placeholder="Enter Text"
              className="inputField"
              value={title} // The title value
              onChange={handleTitleChange}
            />
          ) : editShowFields && selectedFieldType ? (
            <>
              <h3>{selectedFieldType} Field</h3>{" "}
              <input
                type="text"
                placeholder="Enter Text"
                className="inputField"
                value={
                  fields[selectedFieldIndex]?.value || "" // Display the current value of the selected field
                }
                onChange={handleInputChange}
              />
            </>
          ) : (
            <p style={{ fontSize: "14px", color: "#666" }}>
              Select to see editor
            </p>
          )}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handleCreateFormClick}>Create Form</button>
      </div>
    </div>
  );
};

export default Form;
