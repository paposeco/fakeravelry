import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Community from "./components/Community.js";
import Login from "./components/Login.js";
import Messages from "./components/Messages.js";
import Notebook from "./components/Notebook.js";
import Profile from "./components/Profile.js";
import Signup from "./components/Signup.js";
import startDB from "./Firebase.js";

//for github basename on browserrouter / ghpages name
const App = function () {
  const db = startDB();
  console.log(db);
  let signedin = false;
  if (!signedin) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      // isto tudo so aparece se estiver loggedin
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/community">Community</Link>
              </li>
              <li>
                <Link to="/messages">Messages</Link>
              </li>
              <li>
                <Link to="/notebook">Notebook</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/community" element={<Community />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notebook" element={<Notebook />} />
        </Routes>
      </BrowserRouter>
    );
  }
};

export default App;
