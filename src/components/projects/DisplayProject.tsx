import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import type { Pattern, ProjectFromStore } from "../common/types";
import ProjectItem from "./ProjectItem";
import DisplayProjectImage from "./DisplayProjectImage";

const DisplayProject = function() {
    const { state } = useLocation();
    const { projectid } = state;
    const [projectData, setProjectData] = useState<ProjectFromStore | undefined>(
        useSelector((state: RootState) =>
            state.projects.find((element) => element.projectid === projectid)
        )
    );
    const descriptions = new Map([
        ["madefor", "Made for"],
        ["finishby", "Finish by"],
        ["sizemade", "Size"],
        ["patterncategory", "Category"],
    ]);

    //toggle visibility with use effect, but have all components ready to be displayed ?
    const [projectinfoelements, setprojectinfoelements] = useState<JSX.Element[]>(
        []
    );
    /* useEffect(() => {
     *     for (const [key, value] of Object.entries(projectData!.projectinfo)) {
     *         if (value !== "") {
     *             // get description
     *             const description = descriptions.get(key);
     *             if (
     *                 description !== undefined &&
     *                 description !== null &&
     *                 typeof value === "string"
     *             ) {
     *                 setprojectinfoelements(
     *                     projectinfoelements.concat(
     *                         <ProjectItem itemdescription={description} itemvalue={value} />
     *                     )
     *                 );
     *             }
     *         }
     *     }
     *     console.log(projectData!.pattern.name);
     * }, [projectData]); */
    return (
        <div>
            <h2>{projectData!.projectname}</h2>
            <DisplayProjectImage imageurl={projectData!.imageUrl} />
            <div id="projectinfo">
                <h3>Project info</h3>
                <ProjectItem
                    itemdescription="Pattern"
                    itemvalue={projectData!.pattern.name}
                />
                <ProjectItem
                    itemdescription="Craft"
                    itemvalue={projectData!.crafttype}
                />
                <ProjectItem
                    itemdescription="Tags"
                    itemvalue={projectData!.projectinfo.selectedtags}
                />
            </div>
            <div id="needlesyarn">
                <h3>Needles & yarn</h3>
            </div>
            <div id="notes">
                <h3>Notes</h3>
                {projectData!.projectinfo.projectnotes}
            </div>
        </div>
    );
};

//need to work on displayed everything and on toggling visibility for non empty components instead of return an empty div

export default DisplayProject;
/* {
 *     projectid: "",
 *     imageUrl: "",
 *     crafttype: "",
 *     projectname: "",
 *     patternused: "",
 *     pattern: { name: "", about: "" },
 *     projectinfo: {
 *         madefor: "", // special case
 *         linktoraveler: "",
 *         finishby: "",
 *         sizemade: "",
 *         patternfrom: "", // special case too -> only shown if a pattern was selected
 *         patterncategory: "",
 *         tags: "",
 *         needles: [],
 *         hooks: [],
 *         gauge: {
 *             numberStsOrRepeats: null,
 *             horizontalunits: "",
 *             numberRows: null,
 *             gaugesize: "",
 *         },
 *         gaugepattern: "", // special case
 *         yarn: [],
 *         projectnotes: "",
 *     },
 *     projectstatus: {
 *         progressstatus: "In progress",
 *         progressrange: "0",
 *         happiness: "",
 *         starteddate: "",
 *         completeddate: "",
 *     },
 * }, */
