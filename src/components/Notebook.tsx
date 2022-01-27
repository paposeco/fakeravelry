//show project collection from (db -> store redux)
import { RootState } from "./store/store";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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
    const [username, setUsername] = useState<string>("");
    const [displayProjects, setDisplayProjects] = useState<boolean>(false);
    const [projectsToDisplay, setprojectsToDisplay] = useState<
        ProjectFromStore[]
    >([]);
    const [projectsready, setprojectsready] = useState<boolean>(false);

    // check if path matches signed in user
    // if it doesn't, display projects, but don't display new project

    const [usermatchespath, setusermatchespath] = useState<boolean>(true);
    const [useronpath, setuseronpath] = useState<string>("");

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
                    setprojectsToDisplay((prevState) => {
                        let updateState = Array.from(prevState);
                        const currentprojectfromstore: ProjectFromStore = {
                            projectid: project.id,
                            projectslug: project.data().projectslug,
                            imageUrl: project.data().imageUrl,
                            crafttype: project.data().crafttype,
                            projectname: project.data().projectname,
                            patternused: project.data().patternused,
                            pattern: project.data().pattern,
                            projectinfo: project.data().projectinfo,
                            projectstatus: project.data().projectstatus,
                        };
                        updateState.push(currentprojectfromstore);
                        return updateState;
                    });
                });
            });
            addallprojects
                .then((resolve) => setOtherUserProjectsFetched(true))
                .catch((reject) => console.log("error"));
        }
    };

    useEffect(() => {
        setprojectsToDisplay((prevState) => {
            let updateState = Array.from(prevState);
            projectData!.forEach((project) => {
                const currentprojectid = project.projectid;
                const checkifexists = updateState.find(
                    (element: ProjectFromStore) => element.projectid === currentprojectid
                );
                if (checkifexists === undefined && project.projectid !== "") {
                    updateState = [...updateState, project];
                }
            });
            return updateState;
        });
    }, [projectData]);

    // need to consider the other user now

    /* const [projectdataready, setprojectdataready] = useState<boolean>(false);
                              * const [projectdatalength, setprojectdatalength] = useState<number>(0);
                              
                              * const prevdatalengthRef = useRef<number>();
                              * useEffect(() => {
                              *     prevdatalengthRef.current = projectdatalength;
                              * });
                              
                              * const prevDataLength = prevdatalengthRef.current;
                              
                              * useEffect(() => {
                              *     if (projectData !== undefined) {
                              *         console.log("updated project data length");
                              *         setprojectdatalength(projectData.length);
                              *     }
                              * }, [projectData]);
                              
                              * useEffect(() => {
                              *     if (prevDataLength === projectdatalength) {
                              *         console.log("Set");
                              *         console.log(projectData);
                              *         setprojectdataready(true);
                              *     }
                              * }); */
    /*
                                                         const [projectdatalength, setprojectdatalength] = useState<number>(0);
                                                         const [projectdataready, setprojectdataready] = useState<boolean>(false);
                                                         useEffect(() => {
                                                             console.log("checks if project data is ready");
                                                             if (projectdataready) {
                                                                 const usernameonpath = location.pathname.substring(10);
                                                                 if (usernameonpath !== user) {
                                                                     setusermatchespath(false);
                                                                     setuseronpath(usernameonpath);
                                                                     if (
                                                                         otherUserProjectData[0].projectid === "" &&
                                                                         !otherUserProjectsFetched
                                                                     ) {
                                                                         fetchProjectsOtherUser(usernameonpath); // places projects on store
                                                                     } else {
                                                                         setprojectsToDisplay((prevState) => {
                                                                             let updateState = Array.from(prevState);
                                                                             otherUserProjectData.forEach((project) =>
                                                                                 updateState.push(project)
                                                                             );
                                                                             return updateState;
                                                                         });
                                                                     }
                                                                 } else {
                                                                     setprojectsToDisplay((prevState) => {
                                                                         let updateState = Array.from(prevState);
                                                                         projectData!.forEach((project) => updateState.push(project));
                                                                         return updateState;
                                                                     });
                                                                     setprojectsready(true);
                                                                 }
                                                             }
                                                         }, [projectdataready]);
                                                    
                                                        /* useEffect(() => {
                                                      *     if (projectData !== undefined) {
                                                      *         console.log("updated project data length");
                                                      *         setprojectdatalength(projectdatalength + projectData.length);
                                                      *     }
                                                      * }, [projectData]);
                                                      
                                                      * const prevdatalengthRef = useRef<number>();
                                                      * useEffect(() => {
                                                      *     console.log("updated previous value");
                                                      *     prevdatalengthRef.current = projectdatalength;
                                                      * });
                                                      * const prevDataLength = prevdatalengthRef.current;
                                                      
                                                      * useEffect(() => {
                                                      *     if (projectData !== undefined) {
                                                      *         console.log("check array length");
                                                      *         if (prevDataLength === projectData.length) {
                                                      *             console.log("projects are ready");
                                                      *             setprojectdataready(true);
                                                      *         }
                                                      *     }
                                                      * }); */

    /* useEffect(() => {
                                                            *     if (projectsready) {
                                                            *         const currentnameonpath = location.pathname.substring(10);
                                                            *         if (useronpath !== "" && useronpath !== currentnameonpath) {
                                                            *             setprojectsready(false);
                                                            *             setDisplayProjects(false);
                                                            *             setprojectsToDisplay([]);
                                                            *             setprojectdataready(false);
                                                            *         }
                                                            *     }
                                                            * }, [useronpath]);
                                                            
                                                            * useEffect(() => {
                                                            *     const usernameonpath = location.pathname.substring(10);
                                                            *     setuseronpath(usernameonpath);
                                                            *     if (user === usernameonpath) {
                                                            *         setusermatchespath(true);
                                                            *     } else {
                                                            *         setusermatchespath(false);
                                                            *     }
                                                            * });
                                                             */
    /* useEffect(() => {
     *     setUsername(user);
     *     setnewprojectpath("/notebook/" + user + "/newproject");
     * }, [user]); */

    // ou faço o fetch da db aqui ou entao nao sei. se fizer aqui, como é que a app sabe se tb tem de fazer?

    /* useEffect(() => {
     *     if (projectsready) {
     *         setDisplayProjects(true);
     *     }
     * }, [projectsready]); */

    return (
        <div>
            <div>
                <Link to={newprojectpath}>Add new project</Link>
            </div>
            <div>
                {projectsToDisplay.map((project: ProjectFromStore) => (
                    <div key={uniqid()}>
                        <ProjectThumbnail
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
        </div>
    );
};

export default Notebook;

// something funky is going on
