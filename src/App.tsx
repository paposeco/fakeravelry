import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Community from "./components/Community";
import Login from "./components/Login";
import Messages from "./components/Messages.js";
import Notebook from "./components/Notebook";
import Profile from "./components/Profile";
import EditProfile from "./components/profiledetails/EditProfile";
import Welcome from "./components/Welcome";
import Signup from "./components/Signup";
import logo from "./images/logo.svg";
import {
    auth,
    getInfo,
    fetchUserInfo,
    signOutUser,
    getUserProfileImage,
} from "./Firebase";
import NewProject from "./components/NewProject";
import EditProject from "./components/projects/EditProject";
import DisplayProject from "./components/projects/DisplayProject";
import { useDispatch } from "react-redux";
import { userAdded } from "./components/store/userInfoSlice";
import { projectFetchedFromDB } from "./components/projects/projectsSlice";
import Friends from "./components/Friends";
import DisplayProfileImage from "./components/profiledetails/DisplayProfileImage";

// it shouldnt load a login page while checking if the user is logged in; before useeffect something else should be displayed
//for github basename on browserrouter / ghpages name

const App = function() {
    const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [userID, setUserID] = useState<string>("");
    const [peoplepath, setPeoplePath] = useState<string>("");
    const [notebookpath, setNotebookpath] = useState<string>("");
    const [profileimg, setprofileimg] = useState<string>("");
    const dispatch = useDispatch();
    const [projectsFetched, setProjectsFetched] = useState<boolean>(false);
    const fetchUserData = async function() {
        const projectsInDb = await fetchUserInfo();
        if (projectsInDb !== undefined && projectsInDb !== false) {
            const addallprojects = new Promise((resolve, reject) => {
                projectsInDb.forEach((project) => {
                    let gaugeNumberSts: number;
                    let gaugeNumberRows: number;
                    project.data().projectinfo.gauge.numberStsOrRepeats === null
                        ? (gaugeNumberSts = 0)
                        : (gaugeNumberSts =
                            project.data().projectinfo.gauge.numberStsOrRepeats);
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
                const userProfileImage = await getUserProfileImage();
                setprofileimg(userProfileImage);
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

    const signOut = async function() {
        await signOutUser();
        setUserSignedIn(false);
        window.location.reload();
    };

    const [menushown, setmenushown] = useState(false);

    const showMenu = function(event: React.MouseEvent) {
        if (!menushown) {
            const profileimgli = document.getElementById("profileimage");
            const newdiv = document.createElement("div");
            newdiv.setAttribute("id", "profilemenu");
            profileimgli!.appendChild(newdiv);
            const newul = document.createElement("ul");
            const liprofile = document.createElement("li");
            const lisignout = document.createElement("li");
            newul.appendChild(liprofile);
            newul.appendChild(lisignout);
            newdiv.appendChild(newul);
            liprofile.innerHTML = `<a class="profilemenuelement" href="${peoplepath}">Profile</a>`; // checks if user is signed in? but the link around profileimage doesn't check
            lisignout.innerHTML = `<p class="profilemenuelement" onclick=${signOut}>Sign out</p>`;
            newdiv.addEventListener("mouseleave", () => {
                newdiv.remove();
                setmenushown(false);
            });
            setmenushown(true);
        }
    };

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
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">
                                    <span id="logo">
                                        <img src={logo} alt="fakeravelrylogo" />
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">patterns</Link>
                            </li>
                            <li>
                                <Link to="/">yarns</Link>
                            </li>
                            <li>
                                <Link to="/community">community</Link>
                            </li>
                            <li>
                                <Link to="/">support</Link>
                            </li>
                            <li id="linktonotebook">
                                <Link to={notebookpath}>my notebook</Link>
                            </li>
                            <li id="profileimage" onMouseEnter={showMenu}>
                                <Link to={peoplepath}>
                                    <DisplayProfileImage imageurl={profileimg} />
                                </Link>
                            </li>
                            {/* <li>
                                <Link to={peoplepath}>Profile</Link>
                            </li> */}
                            {/* <li>
                                <button onClick={signOut}>Sign Out</button>
                            </li> */}
                        </ul>
                    </nav>
                </div>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/people/:id" element={<Profile />} />
                    <Route path="/people/:id/edit" element={<EditProfile />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/people/:id/friends" element={<Friends />} />
                    <Route path="/messages" element={<Messages />} />
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
            </div>
        );
    }
};
export default App;
