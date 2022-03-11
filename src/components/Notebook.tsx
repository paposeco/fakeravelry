//show project collection from (db -> store redux)
import { RootState } from "./store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProjectThumbnail from "./projects/ProjectThumbnail";
import type { ProjectFromStore } from "./common/types";
import uniqid from "uniqid";
import Circle from "../images/circle.svg";
import ProjectsIcon from "../images/projectsicon.svg";
import QueueIcon from "../images/queueicon.svg";
import StashIcon from "../images/stash.svg";
import HandspunIcon from "../images/handspun.svg";
import ToolsIcon from "../images/tools.svg";
import FavoritesIcon from "../images/favoritesicon.svg";
import LibraryIcon from "../images/libraryicon.svg";

const Notebook = function() {
    const location = useLocation();
    const navigate = useNavigate();
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
    const [cleared, setcleared] = useState<boolean>(false);
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
    }, [projectsToDisplay, cleared, projectsready]);

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
    }, [projectData, user, location.pathname]);

    const loadnewprojectpage = function(event: React.MouseEvent) {
        navigate(newprojectpath);
    };

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
    }, [otherUserProjectData, location.pathname, user]);

    useEffect(() => {
        setnewprojectpath("/notebook/" + user + "/newproject");
    }, [user]);

    useEffect(() => {
        document.title = "Fake Ravelry: " + useronpath + "'s Projects";
    }, [useronpath]);

    return (
        <div id="notebookcontentdiv">
            <div id="notebooknav">
                <ul>
                    <li id="notebooknavselected">
                        <img src={ProjectsIcon} alt="projecticon" /> Projects
                    </li>
                    <li>
                        <img src={QueueIcon} alt="queueicon" /> Queue
                    </li>
                    <li>
                        <img src={StashIcon} alt="stashicon" /> Stash
                    </li>
                    <li>
                        <img src={HandspunIcon} alt="handspunicon" /> Handspun
                    </li>
                    <li>
                        <img src={ToolsIcon} alt="toolsicon" /> Tools
                    </li>
                    <li>
                        <img src={FavoritesIcon} alt="favoritesicon" /> Favorites
                    </li>
                    <li>
                        <img src={LibraryIcon} alt="libraryicon" /> Library
                    </li>
                </ul>
            </div>
            <div id="notebook">
                {usermatchespath ? (
                    <h2>My projects</h2>
                ) : (
                    <h2>{useronpath}'s projects</h2>
                )}
                <div id="notebookcontent">
                    {usermatchespath && (
                        <button className="genericbutton" onClick={loadnewprojectpage}>
                            <img src={Circle} alt="circle" />
                            <span>Add new project</span>
                        </button>
                    )}
                    <div id="notebookprojects">
                        {projectsToDisplay.map((project: ProjectFromStore) => (
                            <div key={uniqid()} className="projectthumbnail">
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
                </div>
            </div>
        </div>
    );
};

export default Notebook;
