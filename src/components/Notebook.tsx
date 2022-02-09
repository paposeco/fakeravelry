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
    const otherUserProjectData: ProjectFromStore[] | undefined = useSelector(
        (state: RootState) => state.otheruserprojects
    );
    const [projectsToDisplay, setprojectsToDisplay] = useState<
        ProjectFromStore[]
    >([]);

    const [useronpath, setuseronpath] = useState<string>(
        location.pathname.substring(10)
    );
    const [usermatchespath, setusermatchespath] = useState<boolean>(true);

    const [projectsready, setprojectsready] = useState<boolean>(false);
    useEffect(() => {
        if (cleared && !projectsready) {
            setprojectsready(true);
            if (useronpath !== user) {
                setusermatchespath(false);
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
            } else {
                setusermatchespath(true);
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
        }
    }, [projectsToDisplay]);

    const [cleared, setcleared] = useState<boolean>(false);

    useEffect(() => {
        if (projectsToDisplay.length > 0) {
            setprojectsToDisplay((prevState) => {
                const freshArray: ProjectFromStore[] = [];
                return freshArray;
            });
        }
        setcleared(true);
        setprojectsready(false);
        setuseronpath(location.pathname.substring(10));
    }, [location]);

    useEffect(() => {
        const usernameonpath = location.pathname.substring(10);
        if (usernameonpath === user && user !== "" && projectData !== undefined) {
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
    }, [projectData]);

    useEffect(() => {
        const usernameonpath = location.pathname.substring(10);
        if (usernameonpath !== user && user !== "") {
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
    }, [otherUserProjectData]);

    useEffect(() => {
        setnewprojectpath("/notebook/" + user + "/newproject");
    }, [user]);

    return (
        <div>
            {usermatchespath && <Link to={newprojectpath}>Add new project</Link>}
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
};

export default Notebook;
