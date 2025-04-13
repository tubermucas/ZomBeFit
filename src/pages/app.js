/*
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import ProfilePage from "./pages/profile";

function App() {
  const [userData, setUserData] = useState(null); // Store logged-in user data

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserData={setUserData} />} />
        <Route
          path="/profile"
          element={userData ? <ProfilePage userData={userData} /> : <Login setUserData={setUserData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
*/