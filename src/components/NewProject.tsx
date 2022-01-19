// create new project
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { projectAdded } from "./projects/projectsSlice";
import { addProjectToNotebook, getInfo } from "../Firebase";

const NewProject = function() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [projectID, setProjectID] = useState<string>(nanoid());
    const [craftType, setCraftType] = useState<string>("knitting");
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
        const newpath = await getUsername(cleanProjectName);
        await addProjectToNotebook(
            projectID,
            craftType,
            projectName,
            patternUsed,
            patternName
        );

        dispatch(
            projectAdded({
                projectid: projectID,
                crafttype: craftType,
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
    };

    const getUsername = async function(selectedprojectname: string) {
        const username = await getInfo("username");
        const path =
            "/notebook/" + username + "/" + selectedprojectname + "/editproject";
        return path;
    };

    return (
        <div>
            <form onSubmit={handlerOfSubmit}>
                <label htmlFor="craft-select">Which craft?</label>
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
