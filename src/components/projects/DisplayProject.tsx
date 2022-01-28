import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import type { ProjectFromStore } from "../common/types";
import ProjectItem from "./ProjectItem";
import DisplayProjectImage from "./DisplayProjectImage";
import DisplayProgress from "./DisplayProgress";
import AboutPattern from "./AboutPattern";

// fetches project com store and displays it with help from modules: displayprojectimage for project image and projectitem that displays each block of information. projectitem gets help from DisplayYarn for rendering the yarn elements

// i will assume that the user doesn't access a single project from the url, but instead through the notebook
const DisplayProject = function() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { projectid, useronpath } = state;
    const user = useSelector((state: RootState) => state.userinfo.username);
    const [usermatchespath, setusermatchespath] = useState<boolean>(true);

    const selectProject = function(currentstate: RootState) {
        if (useronpath === user) {
            return currentstate.projects.find(
                (element) => element.projectid === projectid
            );
        } else {
            return currentstate.otheruserprojects.find(
                (element) => element.projectid === projectid
            );
        }
    };

    let projectdatafromstore = useSelector((state: RootState) =>
        selectProject(state)
    );

    useEffect(() => {
        if (user === useronpath) {
            setusermatchespath(true);
        } else {
            setusermatchespath(false);
        }
    }, [user]);

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
    const [displayLinkToRaveler, setDisplayLinkToRaveler] = useState<boolean>(
        false
    );

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

    useEffect(() => {
        if (projectdatafromstore !== undefined) {
            if (projectdatafromstore.pattern.name === "") {
                setDisplayPattern(false);
            }
            if (projectdatafromstore.projectinfo.patterncategory === "") {
                setDisplayCategory(false);
            }
            if (projectdatafromstore.projectinfo.madefor === "") {
                setDisplayMadeFor(false);
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
            if (
                projectdatafromstore.projectinfo.linktoraveler !== "can't find user" &&
                projectdatafromstore.projectinfo.linktoraveler !== "error in db"
            ) {
                setDisplayLinkToRaveler(true);
            }
        }
    }, [projectdatafromstore]);

    return (
        <div id="project">
            <div id="projectphoto">
                <DisplayProjectImage imageurl={projectdatafromstore!.imageUrl} />
            </div>
            <div id="projectdescription">
                <h2>{projectdatafromstore!.projectname}</h2>

                <div id="projectinfo">
                    <h3>Project info</h3>
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
                            itemvalue={projectdatafromstore!.projectinfo.patterncategory}
                        />
                    )}
                    {displayMadefor && !displayLinkToRaveler && (
                        <ProjectItem
                            itemdescription="Made for"
                            itemvalue={projectdatafromstore!.projectinfo.madefor}
                        />
                    )}
                    {/* need to beautify link */}
                    {displayMadefor && displayLinkToRaveler && (
                        <ProjectItem
                            itemdescription="Made for"
                            itemvalue={projectdatafromstore!.projectinfo.linktoraveler}
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
                    <h3>Needles & yarn</h3>
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
                    <h3>Notes</h3>
                    {displayNotes && (
                        <ProjectItem
                            itemdescription="Notes"
                            itemvalue={projectdatafromstore!.projectinfo.projectnotes}
                        />
                    )}
                </div>
                {/* progress status should be a separate module */}
            </div>
            <div id="projectsidebar">
                <div id="projectbuttons">
                    {usermatchespath && (
                        <button id="editproject" onClick={editProject}>
                            edit project
                        </button>
                    )}
                </div>
                <DisplayProgress status={projectdatafromstore!.projectstatus} />
                <AboutPattern
                    pattern={projectdatafromstore!.pattern}
                    patternfrom={projectdatafromstore!.projectinfo.patternfrom}
                />
            </div>
        </div>
    );
};

export default DisplayProject;
