import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Community from "./components/Community.js";
import Login from "./components/Login";
import Messages from "./components/Messages.js";
import Notebook from "./components/Notebook";
import Profile from "./components/Profile";
import Welcome from "./components/Welcome";
import Signup from "./components/Signup";
import { auth, getInfo, fetchUserInfo } from "./Firebase";
import NewProject from "./components/NewProject";
import EditProject from "./components/projects/EditProject";
import DisplayProject from "./components/projects/DisplayProject";
import { useDispatch } from "react-redux";
import { userAdded } from "./components/store/userInfoSlice";
import { projectFetchedFromDB } from "./components/projects/projectsSlice";

// it shouldnt load a login page while checking if the user is logged in; before useeffect something else should be displayed
//for github basename on browserrouter / ghpages name
//redux
// sign out button across all pages
const App = function() {
    const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [userID, setUserID] = useState<string>("");
    const [peoplepath, setPeoplePath] = useState<string>("");
    const [notebookpath, setNotebookpath] = useState<string>("");
    const dispatch = useDispatch();
    const [projectsFetched, setProjectsFetched] = useState<boolean>(false);
    const fetchUserData = async function() {
        const projectsInDb = await fetchUserInfo();
        if (projectsInDb !== undefined) {
            const addallprojects = new Promise((resolve, reject) => {
                projectsInDb.forEach((project) => {
                    let gaugeNumberSts: number;
                    let gaugeNumberRows: number;
                    project.data().projectinfo.gauge.numberStsOrRepeats === null
                        ? (gaugeNumberSts = 0)
                        : (gaugeNumberSts = project.data().projectinfo.gauge
                            .numberStsOrRepeats);
                    project.data().projectinfo.gauge.numberRows === null
                        ? (gaugeNumberRows = 0)
                        : (gaugeNumberRows = project.data().projectinfo.gauge.numberRows);
                    dispatch(
                        projectFetchedFromDB({
                            projectid: project.id,
                            imageUrl: project.data().imageUrl,
                            crafttype: project.data().crafttype,
                            projectslug: project.data().projectslug,
                            projectname: project.data().projectname,
                            patternused: project.data().patternused,
                            patternname: project.data().pattern.name,
                            about: project.data().pattern.about,
                            madefor: project.data().projectinfo.madefor,
                            linktoraveler: project.data().projectinfo.linktoraveler,
                            finishby: project.data().projectinfo.finishby,
                            sizemade: project.data().projectinfo.sizemade,
                            patternfrom: project.data().projectinfo.patternfrom,
                            patterncategory: project.data().projectinfo.patterncategory,
                            selectedtags: project.data().projectinfo.tags,
                            needles: project.data().projectinfo.needles,
                            hooks: project.data().projectinfo.hooks,
                            numberStsOrRepeats: gaugeNumberSts,
                            horizontalunits: project.data().projectinfo.gauge.horizontalunits,
                            numberRows: gaugeNumberRows,
                            gaugesize: project.data().projectinfo.gauge.gaugesize,
                            gaugepattern: project.data().projectinfo.gauge.gaugepattern,
                            yarn: project.data().projectinfo.yarn,
                            projectnotes: project.data().projectinfo.projectnotes,
                            progressstatus: project.data().projectstatus.progressstatus,
                            progressrange: project.data().projectstatus.progressrange,
                            happiness: project.data().projectstatus.happiness,
                            starteddate: project.data().projectstatus.starteddate,
                            completeddate: project.data().projectstatus.completeddate,
                        })
                    );
                });
            });
            addallprojects
                .then((resolve) => setProjectsFetched(true))
                .catch((reject) => console.log("error"));
        }
    };
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserSignedIn(true);
                const userInfo = await getInfo("both");
                setUsername(userInfo[0]);
                setName(userInfo[1]);
                setUserID(userInfo[2]);
                setPeoplePath("/people/" + userInfo[0]);
                setNotebookpath("/notebook/" + userInfo[0]);
            } else {
                setUserSignedIn(false);
            }
        });
    });

    useEffect(() => {
        if (userSignedIn && !projectsFetched) {
            fetchUserData();
        }
    }, [userSignedIn]);

    useEffect(() => {
        if (userID !== "") {
            dispatch(
                userAdded({
                    username: username,
                    name: name,
                    userID: userID,
                })
            );
        }
    }, [userID]);

    if (!userSignedIn) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/people/*" element={<Login />} />
                    <Route path="/community" element={<Login />} />
                    <Route path="/messages" element={<Login />} />
                    <Route path="/notebook/*" element={<Login />} />
                </Routes>
            </BrowserRouter>
        );
    } else {
        return (
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
                    <Route path="/notebook/:id/:id" element={<DisplayProject />} />
                </Routes>
            </BrowserRouter>
        );
    }
};
export default App;
