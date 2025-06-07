import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 import GlobalStyles from "./components/styles/GlobalStyles"; // Import global styles
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ObjUploader from "./components/ObjUploader";
import Profile from "./components/Profile";
import Auth from "./components/Auth";


function App() {
  const [user, setUser] = useState(null);
  return (
    <>
    <GlobalStyles />
    <Router>
      <Navbar />
      <div style={{ marginTop: "80px" }}> {/* Adjust to match nav height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ObjUploader" element={<ObjUploader />} />
          <Route path="/Profile" element={user ? <Profile user={user} /> : <Auth setUser={setUser} />} />
        <Route path="/Auth" element={<Auth setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}


export default App;
