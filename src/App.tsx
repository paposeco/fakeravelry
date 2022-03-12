import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Community from "./components/Community";
import Login from "./components/Login";
import Notebook from "./components/Notebook";
import Profile from "./components/Profile";
import EditProfile from "./components/profiledetails/EditProfile";
import Welcome from "./components/Welcome";
import Signup from "./components/Signup";
import { auth, getInfo, fetchUserInfo } from "./Firebase";
import NewProject from "./components/NewProject";
import EditProject from "./components/projects/EditProject";
import DisplayProject from "./components/projects/DisplayProject";
import { useDispatch } from "react-redux";
import { userAdded } from "./components/store/userInfoSlice";
import { projectFetchedFromDB } from "./components/projects/projectsSlice";
import Friends from "./components/Friends";
import Navigation from "./components/Navigation";

//for github basename on browserrouter / ghpages name

const App = function() {
    const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [userID, setUserID] = useState<string>("");
    const [projectsFetched, setProjectsFetched] = useState<boolean>(false);

    const dispatch = useDispatch();
    // authentication observer
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserSignedIn(true);
                const userInfo = await getInfo("both");
                setUsername(userInfo[0]);
                setName(userInfo[1]);
                setUserID(userInfo[2]);
            } else {
                setUserSignedIn(false);
            }
        });
    }, []);

    // if user is signed in, fetches user's projects from DB and dispatches to store
    useEffect(() => {
        const fetchUserData = async function() {
            const projectsInDb = await fetchUserInfo();
            if (projectsInDb !== undefined && projectsInDb !== false) {
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
                                horizontalunits: project.data().projectinfo.gauge
                                    .horizontalunits,
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
        if (userSignedIn && !projectsFetched) {
            fetchUserData();
        }
    }, [userSignedIn, dispatch, projectsFetched]);

    // if user is logged in, dispatches user info to store
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
    }, [userID, dispatch, name, username]);

    // if user is not signed in, only display the login page or sign up page
    if (!userSignedIn) {
        return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/people/*" element={<Login />} />
                <Route path="/community" element={<Login />} />
                <Route path="/messages" element={<Login />} />
                <Route path="/notebook/*" element={<Login />} />
            </Routes>
        );
    } else {
        return (
            <div>
                <div id="navcontainer">
                    <Navigation username={username} />
                </div>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/people/:id" element={<Profile />} />
                    <Route path="/people/:id/edit" element={<EditProfile />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/people/:id/friends" element={<Friends />} />
                    <Route path="/notebook/:id/" element={<Notebook />} />
                    <Route path="/notebook/:id/newproject/*" element={<NewProject />} />
                    <Route
                        path="/notebook/:id/projects/:id/editproject/"
                        element={<EditProject />}
                    />
                    <Route
                        path="/notebook/:id/projects/:id"
                        element={<DisplayProject />}
                    />
                </Routes>
                <footer>
                    <p>
                        <a href="https:github.com/paposeco/">
                            <span>
                                <i className="lab la-github"></i>
                            </span>
                            Fabi
                        </a>
                    </p>
                </footer>
            </div>
        );
    }
};
export default App;
