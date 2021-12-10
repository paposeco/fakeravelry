// create new project
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
//import { projectAdded } from "./projects/projectsSlice";
// should create a new type for yarn only

const NewProject = function() {
    let navigate = useNavigate();

    //    const dispatch = useDispatch();
    // need to save to redux store and db
    /* const handlerSubmit = function(event: React.FormEvent<HTMLFormElement>) {
     *     event.preventDefault();
     *     //HTMLElement type is the base type for the other tag types of the DOM. For example, the type HTMLInputElement extends HTMLElement and have the property value that the type HTMLElement doesn't have.
     *     const crafttype: string = (event.currentTarget.elements.namedItem(
     *         "crafts"
     *     ) as HTMLInputElement).value;
     *     const projectname: string = (event.currentTarget.elements.namedItem(
     *         "projectname"
     *     ) as HTMLInputElement).value;
     *     const patternused: string = (event.currentTarget.elements.namedItem(
     *         "patternused"
     *     ) as HTMLInputElement).value;
     *     const patternname: string = (event.currentTarget.elements.namedItem(
     *         "patternname"
     *     ) as HTMLInputElement).value;
     *     const newproject = new Project(
     *         crafttype,
     *         projectname,
     *         patternused,
     *         patternname
     *     ); */

    // create project on db
    // return obj of project info
    // save newproject to store and send it to editproject with the id on navigate to easily fetch it from store. id could be number total number of projects +1

    const [projectID, setProjectID] = useState<string>(nanoid());
    const [craftType, setCraftType] = useState<string>("");
    const [projectName, setProjectName] = useState<string>("");
    const [patternName, setPatternName] = useState<string>("");

    const setFunctions = new Map([
        ["craft-select", setCraftType],
        ["projectname", setProjectName],
        ["patternname", setPatternName],
    ]);

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

    const handlerOfSubmit = function(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const patternUsed: string = (event.currentTarget.elements.namedItem(
            "patternused"
        ) as HTMLInputElement).value;
        const newpath: string = "/notebook/editproject/" + projectName;
        navigate(newpath, {
            state: {
                projectid: projectID,
                crafttype: craftType,
                projectname: projectName,
                patternused: patternUsed,
                patternname: patternName,
            },
        });
        // create project in db with project id
    };

    /*
     *       dispatch(
     *             projectAdded({
     *                 projectid: projectID,
     *                 photo: newproject.photo,
     *                 crafttype: newproject.crafttype,
     *                 projectname: newproject.projectname,
     *                 pattern: newproject.pattern,
     *                 projectinfo: newproject.projectinfo,
     *                 projectstatus: newproject.projectstatus,
     *             })
     *         );
     *
     *         const newpath: string = "/notebook/editproject/" + projectname;
     *         navigate(newpath, {
     *             state: {
     *                 projectid: projectID,
     *             },
     *         });
     *     }; */

    return (
        <div>
            <form onSubmit={handlerOfSubmit}>
                <label htmlFor="craft-select">Which craft?</label>
                <select name="crafts" id="craft-select" onChange={handlerOfChange}>
                    <option value="knitting">Knitting</option>
                    <option value="crochet">Crochet</option>
                    <option value="loomknitting">Loom Knitting</option>
                    <option value="machineknitting">Machine Knitting</option>
                    <option value="weaving">Weaving</option>
                    <option value="spinning">Spinning</option>
                </select>
                <label htmlFor="projectname">Name your project </label>
                <input
                    type="text"
                    id="projectname"
                    name="projectname"
                    onChange={handlerOfChange}
                />

                <input
                    type="radio"
                    id="usedapattern"
                    name="patternused"
                    value="usedapattern"
                    defaultChecked
                />
                <label htmlFor="usedapattern">I used a pattern</label>
                <label htmlFor="patternname">Enter the pattern name</label>
                <input
                    type="text"
                    id="patternname"
                    name="patternname"
                    onChange={handlerOfChange}
                />
                <input
                    type="radio"
                    id="didntuseapattern"
                    name="patternused"
                    value="didntuseapattern"
                />
                <label htmlFor="didntuseapattern">I didn't use a pattern</label>
                <input
                    type="radio"
                    id="patternnotonrav"
                    name="patternused"
                    value="patternnotonrav"
                />
                <label htmlFor="patternnotonrav">
                    The pattern that I used is not in Ravelry
                </label>
                <button type="submit">Continue</button>
            </form>
        </div>
    );
};

export default NewProject;

// project details can be added after. this creates a project with a name

/* interface PatternC extends PatternI { }

* class PatternC implements PatternC {
*     /* class PatternC implements PatternI { */
/* * constructor(name: string, about: string) {
 * * this.name = name;
 * * this.about = about;
 * *     }
 * * } * / */
//this.pattern = new PatternC(patternnameselected, "");
