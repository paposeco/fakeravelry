import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Community from "./components/Community.js";
import Login from "./components/Login.js";
import Messages from "./components/Messages.js";
import Notebook from "./components/Notebook.js";
import Profile from "./components/Profile.js";
import Signup from "./components/Signup.js";
import startDB from "./Firebase.js";
import NewProject from "./components/NewProject.tsx";
import EditProject from "./components/projects/EditProject.tsx";

//for github basename on browserrouter / ghpages name
//redux
const App = function() {
  // const db = startDB();
  // let signedin = false;
  // if (!signedin) {
  //   return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<Login />} />
  //         <Route path="/signup" element={<Signup />} />
  //       </Routes>
  //     </BrowserRouter>
  //   );
  // } else {
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
      {/* should probably be /user/wtv */}
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/community" element={<Community />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notebook" element={<Notebook />} />
        <Route path="/notebook/newproject/*" element={<NewProject />} />
        <Route path="/notebook/editproject/*" element={<EditProject />} />
      </Routes>
    </BrowserRouter>
  );
  // }
};

export default App;