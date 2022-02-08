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
import { otherUserProjectFetchedFromDB } from "./projects/projectsSliceOtherUser";
import { otherUserAdded } from "./store/otherUserInfoSlice";
import DisplayProfileDetails from "./profiledetails/DisplayProfileDetail";
import DisplayProfileImage from "./profiledetails/DisplayProfileImage";
import type { ProfileInformation } from "./common/types";

const Profile = function() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.userinfo);
    const [username, setUsername] = useState<string>("");
    const [userMatchesPath, setUserMatchesPath] = useState<boolean>();
    const [userOnPath, setUserOnPath] = useState<string>("");
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

    useEffect(() => {
        const usernameOnPath = location.pathname.substring(8);
        setUserOnPath(usernameOnPath);
        // wait for user from store
        if (user.username !== "") {
            setUsername(user.username);
            if (user.username !== usernameOnPath) {
                setUserMatchesPath(false);
                setnotebookpath("/notebook/" + usernameOnPath);
                if (!otherUserDetailsFetched) {
                    fetchUserOtherDetails(usernameOnPath);
                }
                checkIfIsFriend(user.userID, usernameOnPath);
            } else {
                setUserMatchesPath(true);
                setnotebookpath("/notebook/" + username);
                setUserIDOnPath(user.userID);
                fetchFriendsList(user.userID);
            }
        }
    }, [location, user]);

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
    }, [location]);

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

    const fetchProjectsOtherUser = async function() {
        const usernameOnPath = location.pathname.substring(8);
        const otheruserprojects = await fetchOtherUserInfo(usernameOnPath);
        if (
            otheruserprojects !== undefined &&
            otheruserprojects !== "user not found"
        ) {
            const addallprojects = new Promise((resolve, reject) => {
                otheruserprojects.forEach((project) => {
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
                .then((resolve) => setOtherUserProjectsFetched(true))
                .catch((reject) => console.log("error"));
        }
    };
    useEffect(() => {
        if (!userMatchesPath && !otherUserProjectsFetched) {
            fetchProjectsOtherUser();
        }
    }, [userMatchesPath]);

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

    const showFriends = function(event: React.MouseEvent) {
        navigate("/people/" + userOnPath + "/friends");
    };

    return (
        <div>
            <h2>{userMatchesPath ? username : userOnPath}</h2>

            {userMatchesPath && <button onClick={editProfile}>edit profile</button>}
            {!userMatchesPath && !isfriend && (
                <button onClick={addFriend}>add friend</button>
            )}
            {!userMatchesPath && isfriend && (
                <button onClick={removeFriend}>remove friend</button>
            )}
            <div id="profile">
                <div id="profileleft">
                    <DisplayProfileImage imageurl={publicImgUrl} />
                    <div>if someone else's profile: add friend, message</div>
                    <div>groups</div>
                </div>
                {infofetched && infotodisplay !== undefined && (
                    <DisplayProfileDetails userinfo={infotodisplay} />
                )}
                <div id="profileright">
                    <div>
                        <Link to={notebookpath}>Projects</Link>
                        queued, library, posts
                    </div>
                    <div>
                        <button id="faves">faves</button>
                        <button id="friends" onClick={showFriends}>
                            {friendslist.length} friends
                        </button>
                        <button id="comments">Comments</button>
                        <button id="stash">Stash</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

// cancel button
// add multiple images?

// added foto and didnt' change profile
