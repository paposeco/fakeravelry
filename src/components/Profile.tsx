import { useLocation, useNavigate } from "react-router-dom";
import { signOutUser, fetchOtherUserInfo, getOtherUserInfo } from "../Firebase";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { otherUserProjectFetchedFromDB } from "./projects/projectsSliceOtherUser";
import { otherUserAdded } from "./store/otherUserInfoSlice";
import DisplayProfileDetails from "./profiledetails/DisplayProfileDetail";

const Profile = function() {
    const navigate = useNavigate();
    const signOut = async function() {
        await signOutUser();
        navigate("/");
    };
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state: RootState) => state.userinfo);
    const [username, setUsername] = useState<string>("");
    const [userSelectedName, setUserSelectedName] = useState<string>("");
    const [userMatchesPath, setUserMatchesPath] = useState<boolean>(true);
    const [userOnPath, setUserOnPath] = useState<string>("");
    const [userType, setUserType] = useState<string>("user");
    const [
        otherUserProjectsFetched,
        setOtherUserProjectsFetched,
    ] = useState<boolean>(false);
    const [
        otherUserDetailsFetched,
        setOtherUserDetailsFetched,
    ] = useState<boolean>(false);

    useEffect(() => {
        setUsername(user.username);
        setUserSelectedName(user.name);
    }, [user]);

    useEffect(() => {
        const usernameOnPath = location.pathname.substring(8);
        if (usernameOnPath !== username) {
            setUserMatchesPath(false);
            setUserOnPath(usernameOnPath);
            setUserType("otheruser");
        }
    }, [username]);

    useEffect(() => {
        if (!otherUserDetailsFetched) {
            fetchUserOtherDetails();
        }
    }, [userOnPath]);

    const fetchUserOtherDetails = async function() {
        const otheruserdetails = await getOtherUserInfo(userOnPath);
        if (
            otheruserdetails !== undefined &&
            otheruserdetails !== "user not found"
        ) {
            const adddetailstostore = new Promise((Resolve, reject) => {
                dispatch(
                    otherUserAdded({
                        username: otheruserdetails[0],
                        name: otheruserdetails[1],
                        userID: otheruserdetails[2],
                    })
                );
            });
            adddetailstostore
                .then((resolve) => setOtherUserDetailsFetched(true))
                .catch((reject) => console.log("error"));
        }
    };

    const fetchProjectsOtherUser = async function() {
        const otheruserprojects = await fetchOtherUserInfo(userOnPath);
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
            // fetch projects from db for user on path and place them on store
            fetchProjectsOtherUser();
        }
    }, [userMatchesPath]);

    return (
        <div>
            <h2>Profile</h2>
            <p>Hello username</p>
            <DisplayProfileDetails usertype={userType} />
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
};

export default Profile;
