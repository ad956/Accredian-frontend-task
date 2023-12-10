import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login";
import SignUpPage from "./components/Signup";
import SuccessPage from "./components/Success";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LoginPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/success" Component={SuccessPage} />
        <Route path="/signup" Component={SignUpPage} />
      </Routes>
    </Router>
  );
}

export default App;
