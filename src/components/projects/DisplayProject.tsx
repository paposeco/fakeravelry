import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import ProjectItem from "./ProjectItem";
import DisplayProjectImage from "./DisplayProjectImage";
import DisplayProgress from "./DisplayProgress";
import AboutPattern from "./AboutPattern";
import {
    deleteProject,
    deletePhoto,
    getUserProfileInformation,
} from "../../Firebase";
import { projectDeleted, projectPhotoDeleted } from "./projectsSlice";
import Breadcrumbs from "./Breadcrumbs";
import ProjectsIcon from "../../images/projectsicon.svg";
import FavoritesIcon from "../../images/favoritesicon.svg";
import UploadPhotoIcon from "../../images/uploadphoto.svg";
import EditIcon from "../../images/edit.svg";
import TrashIcon from "../../images/delete.svg";
import type { ProfileInformation } from "../common/types";

// fetches project com store and displays it with help from modules: displayprojectimage for project image and projectitem that displays each block of information. projectitem gets help from DisplayYarn for rendering the yarn elements

const DisplayProject = function() {
    const { state } = useLocation();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { projectid } = state;
    const user = useSelector((state: RootState) => state.userinfo.username);
    const userid = useSelector((state: RootState) => state.userinfo.userID);
    const otheruserid = useSelector(
        (state: RootState) => state.otheruserinfo.userID
    );
    const [usermatchespath, setusermatchespath] = useState<boolean>(true);

    // selects project from store according to its id
    const selectProject = function(currentstate: RootState) {
        const currentuseronpath = location.pathname
            .substring(0, location.pathname.indexOf("projects") - 1)
            .substring(10);
        if (user !== "") {
            if (currentuseronpath === user) {
                return currentstate.projects.find(
                    (element) => element.projectid === projectid
                );
            } else {
                return currentstate.otheruserprojects.find(
                    (element) => element.projectid === projectid
                );
            }
        }
    };

    let projectdatafromstore = useSelector((state: RootState) =>
        selectProject(state)
    );

    useEffect(() => {
        const currentuseronpath = location.pathname
            .substring(0, location.pathname.indexOf("projects") - 1)
            .substring(10);
        if (user !== "") {
            if (user === currentuseronpath) {
                setusermatchespath(true);
                setuseronpath(user);
            } else {
                setusermatchespath(false);
                setuseronpath(currentuseronpath);
            }
        }
    }, [user, location.pathname]);

    const [displayPattern, setDisplayPattern] = useState<boolean>(true);
    const [displayCategory, setDisplayCategory] = useState<boolean>(true);
    const [displayMadefor, setDisplayMadeFor] = useState<boolean>(true);
    const [displayFinishby, setDisplayFinishby] = useState<boolean>(true);
    const [displaySize, setDisplaySize] = useState<boolean>(true);
    const [displayTags, setDisplayTags] = useState<boolean>(true);
    const [displayNeedles, setDisplayNeedles] = useState<boolean>(true);
    const [displayHooks, setDisplayHooks] = useState<boolean>(true);
    const [displayGauge, setDisplayGauge] = useState<boolean>(true);
    const [displayYarn, setDisplayYarn] = useState<boolean>(true);
    const [displayNotes, setDisplayNotes] = useState<boolean>(true);
    const [useronpath, setuseronpath] = useState<string>("");
    const [madeforname, setmadeforname] = useState<string>("");

    // if project page belongs to logged in user, user can edit or delete project
    const deleteproject = function(event: React.MouseEvent) {
        const currentprojectid = state.projectid;
        deleteProject(currentprojectid);
        dispatch(projectDeleted({ projectid: currentprojectid }));
        navigate("/notebook/" + user);
    };

    const editProject = function(event: React.MouseEvent) {
        const cleanProjectName = projectdatafromstore!.projectname
            .toLowerCase()
            .trim()
            .replace(/ /g, "-");

        const path =
            "/notebook/" + user + "/projects/" + cleanProjectName + "/editproject";
        navigate(path, {
            state: { projectid: projectdatafromstore!.projectid },
        });
    };

    // only displays items that are filled in
    useEffect(() => {
        if (projectdatafromstore !== undefined) {
            if (projectdatafromstore.pattern.name === "") {
                setDisplayPattern(false);
            }
            if (projectdatafromstore.projectinfo.patterncategory === "") {
                setDisplayCategory(false);
            }

            if (projectdatafromstore.projectinfo.finishby === "") {
                setDisplayFinishby(false);
            }
            if (projectdatafromstore.projectinfo.sizemade === "") {
                setDisplaySize(false);
            }
            if (projectdatafromstore.projectinfo.selectedtags === "") {
                setDisplayTags(false);
            }

            if (projectdatafromstore.projectinfo.hooks.length === 0) {
                setDisplayHooks(false);
            }
            if (projectdatafromstore.projectinfo.needles.length === 0) {
                setDisplayNeedles(false);
            }
            if (
                projectdatafromstore.projectinfo.gauge.numberStsOrRepeats ===
                undefined &&
                projectdatafromstore.projectinfo.gauge.numberRows === undefined &&
                projectdatafromstore.projectinfo.gauge.gaugesize === ""
            ) {
                setDisplayGauge(false);
            }
            if (projectdatafromstore.projectinfo.yarn.length === 0) {
                setDisplayYarn(false);
            }
            if (projectdatafromstore.projectinfo.projectnotes === "") {
                setDisplayNotes(false);
            }

            if (projectdatafromstore.imageUrl !== "") {
                setphotoexists(true);
            }
        }
    }, [projectdatafromstore]);

    // if link to raveler is filled in, looks for user on DB and if it exists creates link to user's profile; made for displays said link or just a name if user doesn't exist on fake ravelry
    useEffect(() => {
        if (projectdatafromstore !== undefined) {
            if (projectdatafromstore.projectinfo.madefor === "") {
                setDisplayMadeFor(false);
            } else {
                if (
                    projectdatafromstore.projectinfo.linktoraveler !==
                    "can't find user" &&
                    projectdatafromstore.projectinfo.linktoraveler !== "error in db" &&
                    projectdatafromstore.projectinfo.linktoraveler !== ""
                ) {
                    setmadeforname(projectdatafromstore.projectinfo.linktoraveler);
                } else {
                    setmadeforname(projectdatafromstore.projectinfo.madefor);
                }
            }
        }
    }, [projectdatafromstore]);

    const deletephoto = async function(event: React.MouseEvent) {
        const currentprojectid = state.projectid;
        await deletePhoto(currentprojectid);
        dispatch(projectPhotoDeleted({ projectid: currentprojectid }));
        setphotoexists(false);
    };
    const [photoexists, setphotoexists] = useState<boolean>(false);
    const [profilebreadcrumbimage, setprofilebreacrumbimage] = useState<string>(
        ""
    );

    useEffect(() => {
        const fetchUserProfileInformation = async () => {
            if (usermatchespath) {
                if (userid !== "") {
                    const profileinfo:
                        | ProfileInformation
                        | false
                        | undefined = await getUserProfileInformation(userid);
                    if (profileinfo !== undefined && profileinfo !== false) {
                        setprofilebreacrumbimage(profileinfo.imageurl);
                    }
                }
            } else {
                if (otheruserid !== "") {
                    const profileinfo:
                        | ProfileInformation
                        | false
                        | undefined = await getUserProfileInformation(otheruserid);
                    if (profileinfo !== undefined && profileinfo !== false) {
                        setprofilebreacrumbimage(profileinfo.imageurl);
                    }
                }
            }
        };
        fetchUserProfileInformation();
    }, [useronpath, userid, otheruserid, usermatchespath]);

    useEffect(() => {
        document.title =
            "Fake Ravelry: " + useronpath + "'s " + projectdatafromstore!.projectname;
    }, [useronpath, projectdatafromstore]);

    if (projectdatafromstore === undefined) {
        return <div></div>;
    } else {
        return (
            <div id="displayproject">
                <Breadcrumbs
                    username={useronpath}
                    projectname={projectdatafromstore!.projectname}
                    profileimage={profilebreadcrumbimage}
                />
                <div id="projectcontent">
                    <h2>
                        <img src={ProjectsIcon} alt="projecticon" /> Project
                    </h2>
                    <div id="project">
                        <div id="projectphoto">
                            <DisplayProjectImage imageurl={projectdatafromstore!.imageUrl} />
                            {photoexists && (
                                <button onClick={deletephoto} className="genericbutton">
                                    delete photo
                                </button>
                            )}
                        </div>
                        <div id="projectdescription">
                            <h2>{projectdatafromstore!.projectname}</h2>

                            <div id="projectinfo">
                                <h4>Project info</h4>
                                {displayPattern && (
                                    <ProjectItem
                                        itemdescription="Pattern"
                                        itemvalue={projectdatafromstore!.pattern.name}
                                    />
                                )}
                                <ProjectItem
                                    itemdescription="Craft"
                                    itemvalue={projectdatafromstore!.crafttype}
                                />
                                {displayCategory && (
                                    <ProjectItem
                                        itemdescription="Category"
                                        itemvalue={
                                            projectdatafromstore!.projectinfo.patterncategory
                                        }
                                    />
                                )}
                                {displayMadefor && (
                                    <ProjectItem
                                        itemdescription="Made for"
                                        itemvalue={madeforname}
                                    />
                                )}

                                {displayFinishby && (
                                    <ProjectItem
                                        itemdescription="Finish by"
                                        itemvalue={projectdatafromstore!.projectinfo.finishby}
                                    />
                                )}
                                {displaySize && (
                                    <ProjectItem
                                        itemdescription="Size"
                                        itemvalue={projectdatafromstore!.projectinfo.sizemade}
                                    />
                                )}
                                {displayTags && (
                                    <ProjectItem
                                        itemdescription="Tags"
                                        itemvalue={projectdatafromstore!.projectinfo.selectedtags}
                                    />
                                )}
                            </div>
                            <div id="needlesyarn">
                                {projectdatafromstore!.crafttype === "knitting" && (
                                    <h4>Needles & yarn</h4>
                                )}
                                {projectdatafromstore!.crafttype === "crochet" && (
                                    <h4>Hooks & yarn</h4>
                                )}
                                {projectdatafromstore!.crafttype !== "knitting" &&
                                    projectdatafromstore!.crafttype !== "crochet" && (
                                        <h4>Yarn</h4>
                                    )}
                                {displayNeedles && (
                                    <ProjectItem
                                        itemdescription="Needle"
                                        itemvalue={projectdatafromstore!.projectinfo.needles}
                                    />
                                )}
                                {displayHooks && (
                                    <ProjectItem
                                        itemdescription="Hook"
                                        itemvalue={projectdatafromstore!.projectinfo.hooks}
                                    />
                                )}
                                {displayGauge && (
                                    <ProjectItem
                                        itemdescription="Gauge"
                                        itemvalue={projectdatafromstore!.projectinfo.gauge}
                                    />
                                )}
                                {displayYarn && (
                                    <ProjectItem
                                        itemdescription="Yarn"
                                        itemvalue={projectdatafromstore!.projectinfo.yarn}
                                    />
                                )}
                            </div>
                            <div id="notes">
                                <h4>Notes</h4>
                                {displayNotes && (
                                    <ProjectItem
                                        itemdescription="Notes"
                                        itemvalue={projectdatafromstore!.projectinfo.projectnotes}
                                    />
                                )}
                            </div>
                        </div>
                        <div id="projectsidebar">
                            <div id="projectbuttons">
                                {usermatchespath && (
                                    <div>
                                        <button
                                            id="editproject"
                                            className="projectbutton"
                                            onClick={editProject}
                                        >
                                            <img src={EditIcon} alt="editicon" /> edit project
                                        </button>
                                        <button
                                            id="deleteproject"
                                            className="projectbutton"
                                            onClick={deleteproject}
                                        >
                                            <img src={TrashIcon} alt="trashicon" /> delete project
                                        </button>
                                        <button className="projectbutton">
                                            <img src={UploadPhotoIcon} alt="uploadicon" /> update
                                            photos
                                        </button>
                                        <button className="projectbutton">
                                            <img src={FavoritesIcon} alt="favoriteicon" /> save in
                                            favorites
                                        </button>
                                    </div>
                                )}
                            </div>
                            <DisplayProgress status={projectdatafromstore!.projectstatus} />
                            <AboutPattern
                                pattern={projectdatafromstore!.pattern}
                                patternfrom={projectdatafromstore!.projectinfo.patternfrom}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default DisplayProject;
