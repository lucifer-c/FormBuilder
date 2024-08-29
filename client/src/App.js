import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Form from "./component/form";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  );
}

export default App;
