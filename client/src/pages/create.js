import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App.css";

const Create = () => {
  const navigate = useNavigate();

  const [showTextField, setShowTextField] = useState(false);
  const [title, setTitle] = useState("Untitled");
  const [showInputTypes, setShowInputTypes] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const [fields, setFields] = useState([]);
  const [form, setForm] = useState([]);
  const [selectedFieldType, setSelectedFieldType] = useState("");
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);
  const [editShowFields, setEditShowFields] = useState(false);
  const [error, setError] = useState("");

  const handleEditClick = () => {
    if (title === "Untitled") {
      setTitle("");
    }
    setShowTextField(true);
  };

  const handleTitleChange = (event) => {
    const newValue = event.target.value;
    setTitle(newValue);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (selectedFieldIndex !== null) {
      const updatedForm = form.map((item, index) =>
        index === selectedFieldIndex ? { ...item, inputTitle: value } : item
      );
      setForm(updatedForm);

      const updatedFields = fields.map((field, index) =>
        index === selectedFieldIndex ? { ...field, value } : field
      );
      setFields(updatedFields);
    }
  };

  const handleCreateFormClick = async () => {
    if (!title.trim()) {
      setError("Form title cannot be empty.");
      return;
    }
    const emptyField = form.some((field) => !field.inputTitle.trim());
    if (emptyField) {
      setError("Fill out the empty fields or delete the empty fields.");
      return;
    }

    if (form.length === 0) {
      setError("You should create atleast one field.");
      return;
    }

    if (!form) {
      setError("Fill out the empty fields or delete the empty fields.");
      return;
    }

    setError("");

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
    setShowFields(!showFields);
    if (!showFields) {
      setShowInputTypes(true);
    } else {
      setShowInputTypes(false);
    }
  };

  const handleInputTypeClick = (type) => {
    if (fields.length >= 20) {
      alert("Only 20 fields are allowed.");
      return;
    }
    const newField = { type, value: "" };
    setFields([...fields, newField]);

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
    setFields(updatedFields);

    const updatedForm = form.filter((_, i) => i !== index);
    setForm(updatedForm);
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
              ✏️
            </span>
          </h2>
          {/* Render fields dynamically */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {fields.map((field, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 calc(50% - 10px)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  name={field.type.toLowerCase()}
                  placeholder="Title"
                  value={field.value}
                  readOnly
                  style={{
                    flex: "1",
                  }}
                />
                <span
                  onClick={() => handleFieldEdit(index)}
                  style={{ marginLeft: "5px" }}
                >
                  ✏️
                </span>
                <span
                  onClick={() => handleFieldDelete(index)}
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                >
                  <DeleteIcon />
                </span>
              </div>
            ))}
          </div>
          <div>
            <button onClick={handleAddInputClick}>
              {showFields ? "Close Add Input" : "Add Input"}
            </button>
          </div>

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
              value={title}
              onChange={handleTitleChange}
            />
          ) : editShowFields && selectedFieldType ? (
            <>
              <h3>{selectedFieldType} Field</h3>{" "}
              <input
                type="text"
                placeholder="Enter Text"
                className="inputField"
                value={fields[selectedFieldIndex]?.value || ""}
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
      <div style={{ textAlign: "center", color: "red", marginBottom: "10px" }}>
        {error && <p>{error}</p>}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handleCreateFormClick}>Create Form</button>
      </div>
    </div>
  );
};

export default Create;
