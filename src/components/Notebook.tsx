//show project collection from (db -> store redux)
import { RootState } from "./store/store";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProjectThumbnail from "./projects/ProjectThumbnail";
import type { ProjectFromStore } from "./common/types";
import { otherUserProjectFetchedFromDB } from "./projects/projectsSliceOtherUser";
import { fetchOtherUserInfo } from "../Firebase";
import uniqid from "uniqid";

const Notebook = function() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [newprojectpath, setnewprojectpath] = useState<string>("");
    const user = useSelector((state: RootState) => state.userinfo.username);
    let projectData: ProjectFromStore[] | undefined = useSelector(
        (state: RootState) => state.projects
    );
    const otherUserProjectData: ProjectFromStore[] | undefined = useSelector(
        (state: RootState) => state.otheruserprojects
    );
    const [projectsToDisplay, setprojectsToDisplay] = useState<
        ProjectFromStore[]
    >([]);

    const [useronpath, setuseronpath] = useState<string>("");
    const [usermatchespath, setusermatchespath] = useState<boolean>(true);

    const [
        otherUserProjectsFetched,
        setOtherUserProjectsFetched,
    ] = useState<boolean>(false);

    const fetchProjectsOtherUser = async function(usernameonpath: string) {
        const otheruserprojects = await fetchOtherUserInfo(usernameonpath);
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
        const usernameonpath = location.pathname.substring(10);
        if (useronpath !== usernameonpath) {
            setprojectsToDisplay([]);
            if (usernameonpath === user) {
                setusermatchespath(true);
            }
        }
        setuseronpath(usernameonpath);
    }, [location]);

    useEffect(() => {
        const usernameonpath = location.pathname.substring(10);
        if (usernameonpath === user) {
            setprojectsToDisplay((prevState) => {
                let updateState = Array.from(prevState);
                projectData!.forEach((project) => {
                    const currentprojectid = project.projectid;
                    const checkifexists = updateState.find(
                        (element: ProjectFromStore) =>
                            element.projectid === currentprojectid
                    );
                    if (checkifexists === undefined && project.projectid !== "") {
                        updateState = [...updateState, project];
                    }
                });
                return updateState;
            });
        }
    }, [projectData, useronpath]);

    useEffect(() => {
        const usernameonpath = location.pathname.substring(10);
        if (usernameonpath !== user) {
            if (
                otherUserProjectData[0].projectid === "" &&
                !otherUserProjectsFetched
            ) {
                fetchProjectsOtherUser(usernameonpath);
            } else {
                setprojectsToDisplay((prevState) => {
                    let updateState = Array.from(prevState);
                    otherUserProjectData!.forEach((project) => {
                        const currentprojectid = project.projectid;
                        const checkifexists = updateState.find(
                            (element: ProjectFromStore) =>
                                element.projectid === currentprojectid
                        );
                        if (checkifexists === undefined && project.projectid !== "") {
                            updateState = [...updateState, project];
                        }
                    });
                    return updateState;
                });
            }
            setusermatchespath(false);
        }
    }, [otherUserProjectData, useronpath]);

    useEffect(() => {
        setnewprojectpath("/notebook/" + user + "/newproject");
    }, [user]);

    if (usermatchespath) {
        return (
            <div>
                <div>
                    <Link to={newprojectpath}>Add new project</Link>
                </div>
                {projectsToDisplay.map((project: ProjectFromStore) => (
                    <div key={uniqid()}>
                        <ProjectThumbnail
                            useronpath={useronpath}
                            projectname={project.projectname}
                            projectphoto={project.imageUrl}
                            projectslug={project.projectslug}
                            projectstatus={project.projectstatus.progressstatus}
                            projectprogress={project.projectstatus.progressrange}
                            projectid={project.projectid}
                            username={user}
                        />
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div>
                {projectsToDisplay.map((project: ProjectFromStore) => (
                    <div key={uniqid()}>
                        <ProjectThumbnail
                            useronpath={useronpath}
                            projectname={project.projectname}
                            projectphoto={project.imageUrl}
                            projectslug={project.projectslug}
                            projectstatus={project.projectstatus.progressstatus}
                            projectprogress={project.projectstatus.progressrange}
                            projectid={project.projectid}
                            username={user}
                        />
                    </div>
                ))}
            </div>
        );
    }
};

export default Notebook;
