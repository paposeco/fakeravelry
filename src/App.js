import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React from "react";
import Community from "./components/Community.js";
import Login from "./components/Login.js";
import Messages from "./components/Messages.js";
import Notebook from "./components/Notebook.js";
import Profile from "./components/Profile.js";

//for github basename on browserrouter / ghpages name
const App = () => {
  return (
    //isto tudo so aparece se estiver loggedin
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

      <Switch>
        <Route exact path="/">
          <Profile />
        </Route>
        <Route exact path="/community">
          <Community />
        </Route>
        <Route exact path="/messages">
          <Messages />
        </Route>
        <Route exact path="/notebook">
          <Notebook />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
