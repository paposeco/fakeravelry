//show project collection from (db -> store redux)
import { RootState } from "./store/store";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProjectThumbnail from "./projects/ProjectThumbnail";
import type { ProjectFromStore } from "./common/types";
import uniqid from "uniqid";

const Notebook = function() {
    const location = useLocation();
    const [newprojectpath, setnewprojectpath] = useState<string>("");
    const user = useSelector((state: RootState) => state.userinfo.username);
    const projectData: ProjectFromStore[] | undefined = useSelector(
        (state: RootState) => state.projects
    );
    //const location = useLocation();
    const [username, setUsername] = useState<string>("");
    const [displayProjects, setDisplayProjects] = useState<boolean>(false);
    const otherUserProjectData: ProjectFromStore[] | undefined = useSelector(
        (state: RootState) => state.otheruserprojects
    );
    const [projectsToDisplay, setprojectsToDisplay] = useState<
        ProjectFromStore[]
    >([]);
    const [projectsready, setprojectsready] = useState<boolean>(false);

    // check if path matches signed in user
    // if it doesn't, display projects, but don't display new project

    const [usermatchespath, setusermatchespath] = useState<boolean>(true);
    const [useronpath, setuseronpath] = useState<string>("");

    useEffect(() => {
        if (!projectsready) {
            const usernameonpath = location.pathname.substring(10);
            if (usernameonpath !== user) {
                setusermatchespath(false);
                setuseronpath(usernameonpath);
                setprojectsToDisplay((prevState) => {
                    let updateState = Array.from(prevState);
                    otherUserProjectData.forEach((project) => updateState.push(project));
                    return updateState;
                });
            } else {
                setprojectsToDisplay((prevState) => {
                    let updateState = Array.from(prevState);
                    projectData.forEach((project) => updateState.push(project));
                    return updateState;
                });
            }
            setprojectsready(true);
        }
    });

    // should consider checking if projects are on store and fetching them here if they are not

    useEffect(() => {
        setUsername(user);
        setnewprojectpath("/notebook/" + user + "/newproject");
    }, [user]);

    /* useEffect(() => {
     *     if (projectData[0].projectid !== "") {
     *         setDisplayProjects(true);
     *     }
     * }, [projectData]); */

    useEffect(() => {
        if (projectsToDisplay.length !== 0) {
            if (projectsToDisplay[0].projectid !== "") {
                setDisplayProjects(true);
            }
        }
    }, [projectsToDisplay]);

    return (
        <div>
            <div>
                <Link to={newprojectpath}>Add new project</Link>
            </div>
            <div>
                {displayProjects && (
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
                )}
            </div>
        </div>
    );
};

export default Notebook;
