import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/Dashboard.jsx";
import { UserData } from "./pages/userdata/UserData.jsx";
import SignIn from "./pages/signin/Signin.jsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserData />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
