import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import type { ProjectFromStore } from "../common/types";
import ProjectItem from "./ProjectItem";
import DisplayProjectImage from "./DisplayProjectImage";

// fetches project com store and displays it with help from modules: displayprojectimage for project image and projectitem that displays each block of information. projectitem gets help from DisplayYarn for rendering the yarn elements

const DisplayProject = function() {
    const { state } = useLocation();
    const { projectid } = state;
    const projectData:
        | ProjectFromStore
        | undefined = useSelector((state: RootState) =>
            state.projects.find((element) => element.projectid === projectid)
        );
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

    useEffect(() => {
        if (projectData !== undefined) {
            if (projectData.pattern.name === "") {
                setDisplayPattern(false);
            }
            if (projectData.projectinfo.patterncategory === "") {
                setDisplayCategory(false);
            }
            if (projectData.projectinfo.madefor === "") {
                setDisplayMadeFor(false);
            }
            if (projectData.projectinfo.finishby === "") {
                setDisplayFinishby(false);
            }
            if (projectData.projectinfo.sizemade === "") {
                setDisplaySize(false);
            }
            if (projectData.projectinfo.selectedtags === "") {
                setDisplayTags(false);
            }

            if (projectData.projectinfo.hooks.length === 0) {
                setDisplayHooks(false);
            }
            if (projectData.projectinfo.needles.length === 0) {
                setDisplayNeedles(false);
            }
            if (
                projectData.projectinfo.gauge.numberStsOrRepeats === null &&
                projectData.projectinfo.gauge.numberRows === null &&
                projectData.projectinfo.gauge.gaugesize === ""
            ) {
                setDisplayGauge(false);
            }
            if (projectData.projectinfo.yarn.length === 0) {
                setDisplayYarn(false);
            }
            if (projectData.projectinfo.projectnotes === "") {
                setDisplayNotes(false);
            }
        }
    }, [projectData]);

    // need 2 more divs; one with progress and one with project about
    // need to think about adding more than one image
    return (
        <div>
            <h2>{projectData!.projectName}</h2>
            <DisplayProjectImage imageurl={projectData!.imageUrl} />
            <div id="projectinfo">
                <h3>Project info</h3>
                {displayPattern && (
                    <ProjectItem
                        itemdescription="Pattern"
                        itemvalue={projectData!.pattern.name}
                    />
                )}
                <ProjectItem
                    itemdescription="Craft"
                    itemvalue={projectData!.crafttype}
                />
                {displayCategory && (
                    <ProjectItem
                        itemdescription="Category"
                        itemvalue={projectData!.projectinfo.patterncategory}
                    />
                )}
                {displayMadefor && (
                    <ProjectItem
                        itemdescription="Made for"
                        itemvalue={projectData!.projectinfo.madefor}
                    />
                )}
                {displayFinishby && (
                    <ProjectItem
                        itemdescription="Finish by"
                        itemvalue={projectData!.projectinfo.finishby}
                    />
                )}
                {displaySize && (
                    <ProjectItem
                        itemdescription="Size"
                        itemvalue={projectData!.projectinfo.sizemade}
                    />
                )}
                {displayTags && (
                    <ProjectItem
                        itemdescription="Tags"
                        itemvalue={projectData!.projectinfo.selectedtags}
                    />
                )}
            </div>
            <div id="needlesyarn">
                <h3>Needles & yarn</h3>
                {displayNeedles && (
                    <ProjectItem
                        itemdescription="Needle"
                        itemvalue={projectData!.projectinfo.needles}
                    />
                )}
                {displayHooks && (
                    <ProjectItem
                        itemdescription="Hook"
                        itemvalue={projectData!.projectinfo.hooks}
                    />
                )}
                {displayGauge && (
                    <ProjectItem
                        itemdescription="Gauge"
                        itemvalue={projectData!.projectinfo.gauge}
                    />
                )}
                {displayYarn && (
                    <ProjectItem
                        itemdescription="Yarn"
                        itemvalue={projectData!.projectinfo.yarn}
                    />
                )}
            </div>
            <div id="notes">
                <h3>Notes</h3>
                {displayNotes && (
                    <ProjectItem
                        itemdescription="Notes"
                        itemvalue={projectData!.projectinfo.projectnotes}
                    />
                )}
            </div>
            {/* progress status should be a separate module */}
        </div>
    );
};

export default DisplayProject;
