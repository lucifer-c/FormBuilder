import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewForm = () => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(`/getForm/${id}`);
        setForm(res.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the form:", error);
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const handleChange = (e, fieldId) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const hasEmptyFields = form.fields.some((field) => !formData[field._id]);

    if (hasEmptyFields) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    try {
      const res = await axios.post(`/createForm`, {
        title: form.title,
        fields: Object.keys(formData).map((fieldId) => ({
          inputTitle: form.fields.find((field) => field._id === fieldId)
            ?.inputTitle,
          inputType: form.fields.find((field) => field._id === fieldId)
            ?.inputType,
          inputValue: formData[fieldId],
        })),
      });
      if (res) {
        setSuccessMessage(
          "**Your Data Saved successfully the Form will Reset in 5 Sec**"
        );
        setTimeout(() => setSuccessMessage(""), 5000);
        setTimeout(() => setFormData([]), 5000);
      }
    } catch (error) {
      console.error("There was an error creating the form:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {form ? (
        <div>
          <h1>{form.title}</h1>
          {form.fields.map((field) => (
            <div
              key={field._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px 0",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <label style={{ flex: "1", textAlign: "left" }}>
                {field.inputTitle}
              </label>
              <input
                type={field.inputType.toLowerCase()}
                placeholder={field.inputTitle}
                value={formData[field._id] || ""}
                onChange={(e) => handleChange(e, field._id)}
                style={{ flex: "2", marginLeft: "10px", padding: "5px" }}
              />
            </div>
          ))}
          <button
            onClick={handleSubmit}
            style={{ marginTop: "20px", padding: "10px 20px" }}
          >
            Submit
          </button>
          {successMessage && (
            <p style={{ color: "green", marginTop: "20px" }}>
              {successMessage}
            </p>
          )}
        </div>
      ) : (
        <p>Form not found</p>
      )}
    </div>
  );
};

export default ViewForm;
