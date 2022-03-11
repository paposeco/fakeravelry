import { useLocation, useNavigate } from "react-router-dom";
import {
    fetchOtherUserInfo,
    getOtherUserInfo,
    getUserProfileInformation,
    addFriendDB,
    removeFriendDB,
    getFriends,
} from "../Firebase";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "./store/store";
import {
    otherUserProjectFetchedFromDB,
    clearProjects,
} from "./projects/projectsSliceOtherUser";
import { otherUserAdded } from "./store/otherUserInfoSlice";
import DisplayProfileDetails from "./profiledetails/DisplayProfileDetail";
import DisplayProfileImage from "./profiledetails/DisplayProfileImage";
import type { ProfileInformation, ProjectFromStore } from "./common/types";

//icons
import ProjectIcon from "../images/projectsicon.svg";
import StashIcon from "../images/stash.svg";
import QueueIcon from "../images/queueicon.svg";
import FavoritesIcon from "../images/favoritesicon.svg";
import LibraryIcon from "../images/libraryicon.svg";
import FriendsIcon from "../images/friendsicon.svg";
import ForumIcon from "../images/forumsicon.svg";
import CommentsIcon from "../images/commentsicon.svg";

const Profile = function() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.userinfo);
    const projectData: ProjectFromStore[] = useSelector(
        (state: RootState) => state.projects
    );
    // fetch all info from store and display number of projects
    const [username, setUsername] = useState<string>("");
    const [userMatchesPath, setUserMatchesPath] = useState<boolean>();
    const [userOnPath, setUserOnPath] = useState<string>(
        location.pathname.substring(8)
    );
    const [userIDOnPath, setUserIDOnPath] = useState<string>("");
    const [publicImgUrl, setPublicImgUrl] = useState<string>("");
    const [
        otherUserProjectsFetched,
        setOtherUserProjectsFetched,
    ] = useState<boolean>(false);
    const [
        otherUserDetailsFetched,
        setOtherUserDetailsFetched,
    ] = useState<boolean>(false);

    const [infotodisplay, setinfotodisplay] = useState<ProfileInformation>();
    const [notebookpath, setnotebookpath] = useState<string>("");
    const [friendslist, setfriendslist] = useState<string[]>([]);
    const [isfriend, setisfriend] = useState<boolean>(false);
    const [friendspath, setfriendspath] = useState<string>(
        "/people/" + location.pathname.substring(8) + "/friends"
    );
    const [numberprojects, setnumberprojects] = useState<number>(0);

    useEffect(() => {
        const usernameOnPath = location.pathname.substring(8);
        const fetchUserOtherDetails = async function(usernameonpath: string) {
            const otheruserdetails = await getOtherUserInfo(usernameonpath);
            if (
                otheruserdetails !== undefined &&
                otheruserdetails !== "user not found"
            ) {
                setUserIDOnPath(otheruserdetails[2]);
                dispatch(
                    otherUserAdded({
                        username: otheruserdetails[0],
                        name: otheruserdetails[1],
                        userID: otheruserdetails[2],
                    })
                );
                fetchFriendsList(otheruserdetails[2]);
                setOtherUserDetailsFetched(true);
            }
        };
        setUserOnPath(usernameOnPath);
        // wait for user from store
        if (user.username !== "") {
            setUsername(user.username);
            setnotebookpath("/notebook/" + usernameOnPath);
            if (user.username !== usernameOnPath) {
                setUserMatchesPath(false);
                if (!otherUserDetailsFetched) {
                    fetchUserOtherDetails(usernameOnPath);
                }
                checkIfIsFriend(user.userID, usernameOnPath);
            } else {
                setUserMatchesPath(true);
                setUserIDOnPath(user.userID);
                fetchFriendsList(user.userID);
                setnumberprojects(projectData.length);
            }
        }
    }, [location, user, otherUserDetailsFetched, projectData, dispatch]);

    const fetchFriendsList = async function(userIDtoFetch: string) {
        const friends = await getFriends(userIDtoFetch);
        if (friends === undefined) {
            setfriendslist([]);
        } else {
            setfriendslist(friends);
        }
    };

    // check if logged in user is friends with user on path
    const checkIfIsFriend = async function(
        loggedinuser: string,
        currentuseronpath: string
    ) {
        const friends = await getFriends(loggedinuser);
        const friendexists = friends.includes(currentuseronpath);
        setisfriend(friendexists);
    };

    const fetchUserProfileInformation = async () => {
        if (userIDOnPath !== "") {
            const profileinfo:
                | ProfileInformation
                | false
                | undefined = await getUserProfileInformation(userIDOnPath);
            return profileinfo;
        }
    };
    const [infofetched, setinfofetched] = useState<boolean>(false);

    useEffect(() => {
        if (userIDOnPath !== "" && !infofetched) {
            const profileinfo = fetchUserProfileInformation();
            profileinfo.then(function(dbinfo) {
                if (dbinfo !== false && dbinfo !== undefined) {
                    setinfotodisplay(dbinfo);
                    setPublicImgUrl(dbinfo.imageurl);
                    setinfofetched(true);
                }
            });
        }
    });

    useEffect(() => {
        setinfofetched(false);
        setnumberprojects(0);
    }, [location]);

    useEffect(() => {
        const fetchProjectsOtherUser = async function() {
            const usernameOnPath = location.pathname.substring(8);
            const otheruserprojects = await fetchOtherUserInfo(usernameOnPath);
            if (
                otheruserprojects !== undefined &&
                otheruserprojects !== "user not found"
            ) {
                let countprojects = 0;
                const addallprojects = new Promise((resolve, reject) => {
                    otheruserprojects.forEach((project) => {
                        countprojects += 1;
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
                            otherUserProjectFetchedFromDB({
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
                setnumberprojects(countprojects);
                addallprojects
                    .then((resolve) => setOtherUserProjectsFetched(true))
                    .catch((reject) => console.log("error"));
            }
        };
        if (
            userMatchesPath !== undefined &&
            !userMatchesPath &&
            !otherUserProjectsFetched
        ) {
            fetchProjectsOtherUser();
        }
    }, [userMatchesPath, otherUserProjectsFetched, dispatch, location.pathname]);

    const editProfile = function(event: React.MouseEvent) {
        navigate("/people/" + username + "/edit");
    };
    const addFriend = async function(event: React.MouseEvent) {
        await addFriendDB(userOnPath);
        setfriendslist((prevState) => [...prevState, userOnPath]);
        setisfriend(true);
    };

    const removeFriend = async function(event: React.MouseEvent) {
        await removeFriendDB(userOnPath);
        setfriendslist((prevState) => {
            const newfriendlist = Array.from(prevState);
            const friendtoremove = newfriendlist.findIndex(
                (element) => element === userOnPath
            );
            if (friendtoremove !== -1) {
                newfriendlist.splice(friendtoremove, 1);
            }
            return newfriendlist;
        });
        setisfriend(false);
    };

    useEffect(() => {
        const currentnameonpath = location.pathname.substring(8);
        setUserOnPath(currentnameonpath);
        setfriendspath("/people/" + currentnameonpath + "/friends");
        const loggedinuser = user.username;
        if (loggedinuser !== currentnameonpath) {
            setUserMatchesPath(false);
            setOtherUserDetailsFetched(false);
            setOtherUserProjectsFetched(false);
            dispatch(clearProjects({ allprojects: "allprojects" }));
        } else {
            setUserMatchesPath(true);
            setnumberprojects(projectData.length);
        }
    }, [location, dispatch, projectData, user]);

    useEffect(() => {
        setnumberprojects(projectData.length);
    }, [projectData]);

    useEffect(() => {
        document.title = "Fake Ravelry: " + userOnPath + "'s profile";
    }, [userOnPath]);

    return (
        <div id="content">
            <div id="usernickname">
                <h2>{userMatchesPath ? username : userOnPath}</h2>
            </div>
            <div id="userprofile">
                <div id="profileleft">
                    {userMatchesPath && (
                        <button onClick={editProfile} className="genericbutton">
                            edit profile
                        </button>
                    )}
                    {!userMatchesPath && !isfriend && (
                        <button onClick={addFriend} className="genericbutton">
                            add friend
                        </button>
                    )}
                    {!userMatchesPath && isfriend && (
                        <button onClick={removeFriend} className="genericbutton">
                            remove friend
                        </button>
                    )}

                    <DisplayProfileImage imageurl={publicImgUrl} />
                </div>
                <div id="profile">
                    {infofetched && infotodisplay !== undefined && (
                        <DisplayProfileDetails userinfo={infotodisplay} />
                    )}
                </div>
                <div id="profileright">
                    <div>
                        <Link to={notebookpath}>
                            <img src={ProjectIcon} alt="projecticon" /> {numberprojects}{" "}
                            projects
                        </Link>
                    </div>
                    <div>
                        <Link to="/">
                            <img src={StashIcon} alt="stashicon" /> 0 stashed
                        </Link>
                    </div>

                    <div>
                        <Link to="/">
                            <img src={QueueIcon} alt="queueicon" /> 0 queued{" "}
                        </Link>
                    </div>
                    <div>
                        <Link to="/">
                            <img src={FavoritesIcon} alt="favoritesicon" /> 0 faves
                        </Link>
                    </div>
                    <div>
                        <Link to="/">
                            <img src={LibraryIcon} alt="libraryicon" /> 0 library
                        </Link>
                    </div>
                    <div>
                        <Link to={friendspath}>
                            <img src={FriendsIcon} alt="friendsicon" /> {friendslist.length}{" "}
                            friends
                        </Link>
                    </div>
                    <div>
                        <Link to="/">
                            <img src={ForumIcon} alt="forumicon" /> 0 posts
                        </Link>
                    </div>
                    <div>
                        <Link to="/">
                            <img src={CommentsIcon} alt="commenticon" /> 0 comments
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
