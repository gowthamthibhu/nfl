import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Table from "./components/Programs/Programs";
import 'primeicons/primeicons.css';
import CreateProgram from "./components/CreateProgram/CreateProgram"
import ManageProgram from "./components/ManageProgram/ManageProgram";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/programs" element={<Table />} />
          <Route path="/createprogram" element={<CreateProgram />} />
          <Route path="/manageprogram/:id" element={<ManageProgram />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
