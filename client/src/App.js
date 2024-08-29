import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Create from "./pages/create";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  );
}

export default App;
