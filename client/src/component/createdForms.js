import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const CreatedForm = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("/getCretedForm");

      if (res) {
        setFormData(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("There was an error fetching the data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/deleteForm/${id}`);
      setFormData(formData.filter((form) => form._id !== id));
    } catch (error) {
      console.error("There was an error deleting the form:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="appContainer">
      {formData ? (
        <Grid container spacing={2}>
          {formData.map((form) => (
            <Grid item xs={12} sm={6} md={4} key={form._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {form.title}
                  </Typography>
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      variant="contained"
                      style={{
                        marginRight: "10px",
                        backgroundColor: "green",
                        color: "white",
                        padding: "6px 12px", // Adjust padding for smaller button
                        fontSize: "0.75rem", // Smaller text size
                        borderRadius: "59px",
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        marginRight: "10px",
                        padding: "6px 12px",
                        fontSize: "0.75rem",
                        borderRadius: "59px",
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      style={{
                        marginRight: "10px",
                        padding: "6px 12px",
                        fontSize: "0.75rem",
                        borderRadius: "59px",
                      }}
                      onClick={() => handleDelete(form._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="appTitle">
          <p>Welcome to form.com</p>
        </div>
      )}
    </div>
  );
};

export default CreatedForm;
