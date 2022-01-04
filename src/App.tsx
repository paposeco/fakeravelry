import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Community from "./components/Community.js";
import Login from "./components/Login";
import Messages from "./components/Messages.js";
import Notebook from "./components/Notebook";
import Profile from "./components/Profile";
import Welcome from "./components/Welcome";
import Signup from "./components/Signup";
import { auth, getInfo } from "./Firebase";
import NewProject from "./components/NewProject";
import EditProject from "./components/projects/EditProject";

// it shouldnt load a login page while checking if the user is logged in; before useeffect something else should be displayed
//for github basename on browserrouter / ghpages name
//redux
// sign out button across all pages
const App = function() {
    const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [peoplepath, setPeoplePath] = useState<string>("");
    const [notebookpath, setNotebookpath] = useState<string>("");

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserSignedIn(true);
                const currentusername = await getInfo("username");
                setUsername(currentusername);
                setPeoplePath("/people/" + currentusername);
                setNotebookpath("/notebook/" + currentusername);
            } else {
                setUserSignedIn(false);
            }
        });
    });

    if (!userSignedIn) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    {/* <Route path="/people/:id" element={<Profile />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/notebook" element={<Notebook />} />
                    <Route path="/notebook/newproject/*" element={<NewProject />} />
                    <Route path="/notebook/:id/editproject/" element={<EditProject />} /> have to check if this is right*/}
                </Routes>
            </BrowserRouter>
        );
    } else {
        return (
            //notebook should be /id too
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
                                <Link to={notebookpath}>Notebook</Link>
                            </li>
                            <li>
                                <Link to={peoplepath}>Profile</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/* /* should probably be /user/wtv */}
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/people/:id" element={<Profile />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/notebook/:id/" element={<Notebook />} />
                    <Route path="/notebook/:id/newproject/*" element={<NewProject />} />
                    <Route
                        path="/notebook/:id/:id/editproject/"
                        element={<EditProject />}
                    />
                </Routes>
            </BrowserRouter>
        );
    }
};
export default App;
