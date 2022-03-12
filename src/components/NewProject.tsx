// create new project
import React, { useState, useEffect } from "react";
import { RootState } from "./store/store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { projectAdded } from "./projects/projectsSlice";
import { addProjectToNotebook, checkUniqueProjectName } from "../Firebase";
import Breadcrumbs from "./projects/Breadcrumbs";
import type { ProfileInformation } from "./common/types";
import { getUserProfileInformation } from "../Firebase";

const NewProject = function() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [projectID, setProjectID] = useState<string>("");
    const [craftType, setCraftType] = useState<string>("knitting");
    const [projectName, setProjectName] = useState<string>("");
    const [patternName, setPatternName] = useState<string>("");
    const user = useSelector((state: RootState) => state.userinfo.username);
    const userid = useSelector((state: RootState) => state.userinfo.userID);
    const projectData = useSelector((state: RootState) => state.projects);
    const [username, setUsername] = useState<string>("");
    const setFunctions = new Map([
        ["craft-select", setCraftType],
        ["projectname", setProjectName],
        ["patternname", setPatternName],
    ]);

    useEffect(() => {
        setProjectID(nanoid());
    }, []);
    const handlerOfChange = function(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void {
        const elementID = event.target.id;
        const newvalue = event.target.value;
        const elementStateFunction = setFunctions.get(elementID);
        if (elementStateFunction !== undefined) {
            elementStateFunction(newvalue);
        }
    };

    // creates project in DB with provided information and also adds project to store
    const handlerOfSubmit = async function(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        const patternUsed: string = (event.currentTarget.elements.namedItem(
            "patternused"
        ) as HTMLInputElement).value;
        const cleanProjectName = projectName
            .toLowerCase()
            .trim()
            .replace(/ /g, "-");
        // checks if a project with the same name already exists in DB; if it does, checkUniqueProjectName returns a usable projectslug (with a number)
        const uniqueProjectSlug = await checkUniqueProjectName(cleanProjectName);
        if (uniqueProjectSlug !== false) {
            const newpath = getPathWithUsername(uniqueProjectSlug);
            await addProjectToNotebook(
                projectID,
                craftType,
                uniqueProjectSlug,
                projectName,
                patternUsed,
                patternName
            );

            dispatch(
                projectAdded({
                    projectid: projectID,
                    crafttype: craftType,
                    projectslug: uniqueProjectSlug,
                    projectname: projectName,
                    patternused: patternUsed,
                    patternname: patternName,
                })
            );

            navigate(newpath, {
                state: {
                    projectid: projectID,
                },
            });
        } else {
            console.log("error creating project");
        }
    };

    const getPathWithUsername = function(projectslug: string) {
        const path =
            "/notebook/" + username + "/projects/" + projectslug + "/editproject";
        return path;
    };

    const [profilebreadcrumbimage, setprofilebreadcrumbimage] = useState<string>(
        ""
    );
    const [projectordinalnumber, setprojectordinalnumber] = useState<string>("");

    // for displaying the user's number of existing projects in ordinal
    const transformtoordinalnumber = function(originalnumber: number) {
        let ordinalnumber = "";
        if (Math.floor(originalnumber / 10) === 0) {
            switch (originalnumber) {
                case 1:
                    ordinalnumber = "1st";
                    break;
                case 2:
                    ordinalnumber = "2nd";
                    break;
                case 3:
                    ordinalnumber = "3rd";
                    break;
                default:
                    ordinalnumber = originalnumber + "th";
            }
        } else if (
            Math.floor(originalnumber / 10) > 0 &&
            Math.floor(originalnumber / 10) <= 9
        ) {
            switch (originalnumber % 10) {
                case 1:
                    ordinalnumber = (originalnumber - (originalnumber % 10)) / 10 + "1st";
                    break;
                case 2:
                    ordinalnumber = (originalnumber - (originalnumber % 10)) / 10 + "2nd";
                    break;
                case 3:
                    ordinalnumber = (originalnumber - (originalnumber % 10)) / 10 + "3rd";
                    break;
                default:
                    ordinalnumber = originalnumber + "th";
            }
        } else {
            ordinalnumber = originalnumber + "th";
        }
        return ordinalnumber;
    };
    useEffect(() => {
        const fetchUserProfileInformation = async () => {
            if (userid !== "") {
                const profileinfo:
                    | ProfileInformation
                    | false
                    | undefined = await getUserProfileInformation(userid);
                if (profileinfo !== undefined && profileinfo !== false) {
                    setprofilebreadcrumbimage(profileinfo.imageurl);
                }
            }
        };
        fetchUserProfileInformation();
    }, [userid]);

    useEffect(() => {
        setUsername(user);
    }, [user]);

    useEffect(() => {
        const ordinalnumber = transformtoordinalnumber(projectData.length + 1);
        setprojectordinalnumber(ordinalnumber);
    }, [projectData]);

    useEffect(() => {
        document.title = "Fake Ravelry";
    }, []);

    return (
        <div id="newprojectcontent">
            <Breadcrumbs
                username={username}
                projectname={"new project"}
                profileimage={profilebreadcrumbimage}
            />

            <div id="newproject">
                <div id="newprojectprofile">
                    <img src={profilebreadcrumbimage} alt="profileimg" />

                    <p>You are adding your {projectordinalnumber} project</p>
                </div>
                <form onSubmit={handlerOfSubmit} id="newprojectform">
                    <label htmlFor="craft-select" className="labelemphasis">
                        Which craft?
                    </label>
                    <select
                        name="crafts"
                        id="craft-select"
                        value={craftType}
                        onChange={handlerOfChange}
                    >
                        <option value="knitting">Knitting</option>
                        <option value="crochet">Crochet</option>
                        <option value="loomknitting">Loom Knitting</option>
                        <option value="machineknitting">Machine Knitting</option>
                        <option value="weaving">Weaving</option>
                        <option value="spinning">Spinning</option>
                    </select>
                    <label htmlFor="projectname" className="labelemphasis">
                        Name your project{" "}
                    </label>
                    <input
                        type="text"
                        id="projectname"
                        name="projectname"
                        onChange={handlerOfChange}
                    />
                    <div className="newprojectlabel">
                        <input
                            type="radio"
                            id="usedapattern"
                            name="patternused"
                            value="usedapattern"
                            defaultChecked
                        />
                        <label htmlFor="usedapattern">I used a pattern</label>
                    </div>
                    <label htmlFor="patternname" className="labelemphasis">
                        Enter the pattern name
                    </label>
                    <input
                        type="text"
                        id="patternname"
                        name="patternname"
                        onChange={handlerOfChange}
                    />
                    <div className="newprojectlabel">
                        <input
                            type="radio"
                            id="didntuseapattern"
                            name="patternused"
                            value="didntuseapattern"
                        />
                        <label htmlFor="didntuseapattern" className="newprojectlabel">
                            I didn't use a pattern
                        </label>
                    </div>
                    <div className="newprojectlabel">
                        <input
                            type="radio"
                            id="patternnotonrav"
                            name="patternused"
                            value="patternnotonrav"
                        />
                        <label htmlFor="patternnotonrav" className="newprojectlabel">
                            The pattern that I used is not in Ravelry
                        </label>
                    </div>
                    <button type="submit" className="genericbutton">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewProject;
