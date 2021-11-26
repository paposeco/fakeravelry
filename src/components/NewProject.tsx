// create new project
import React, { useState } from "react";
import { Routes, Route, useNavigate, RouteObject } from "react-router-dom";
//import EditProject from "./projects/EditProject";

export interface Pattern {
    name: string;
    about: string;
}
// this function doesn't need an argument, not sure how to make a type for it
const NewProject = function() {
    let navigate = useNavigate();

    interface ProjectInfo {
        madefor: string;
        linktoraveler: string;
        finishby: string; //type date
        sizemade: string;
        patternfrom: string;
        patterncategory: string;
        tags: string[]; // separate tags and add # // select can be more than one
        needles: string[];
        gauge: Gauge;
        gaugepattern: string;
        yarn: string[]; // should probably be an obj
        projectnotes: string;
        photo: string;
        status: string;
        happiness: string;
        progress: number;
        started: string;
        completed: string;
    }

    interface Gauge {
        numberStsOrRepeats: string;
        stitches: boolean; // if false, user is using repeats
        numberRows: number | null;
        gaugesize: string; //2.5/5/10cm
    }

    class Project {
        crafttype: string;
        projectname: string;
        patternused: string;
        pattern: Pattern;
        projectinfo: ProjectInfo;

        constructor(
            crafttypeselected: string,
            projectnameselected: string,
            patternusedselected: string,
            patternnameselected: string
        ) {
            this.crafttype = crafttypeselected;
            this.projectname = projectnameselected;
            this.patternused = patternusedselected;
            if (patternusedselected === "usedapattern") {
                this.pattern = { name: patternnameselected, about: "" }; //about should look for a pattern in db
            } else if (patternusedselected === "didntuseapattern") {
                this.pattern = { name: "", about: "" };
            } else {
                this.pattern = {
                    name: "",
                    about: "Personal pattern (not in Ravelry)",
                };
            }
            this.projectinfo = {
                madefor: "",
                linktoraveler: "",
                finishby: "",
                sizemade: "",
                patternfrom: "",
                patterncategory: "", //select. might be more than one?
                tags: [], // separate tags and add # // select can be more than one
                needles: [],
                gauge: {
                    numberStsOrRepeats: "",
                    stitches: true,
                    numberRows: null, //not sure
                    gaugesize: "",
                }, // select. gauge size must be 2.5/5/10cm
                gaugepattern: "", //yarn, needles and private notes gets added afterwards
                yarn: [],
                projectnotes: "",
                photo: "", //image src
                status: "In progress", // change status with select
                happiness: "",
                progress: 0,
                started: "", //date
                completed: "", //date}
            };
        }
    }

    // need to save to redux store and db
    const handlerSubmit = function(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //HTMLElement type is the base type for the other tag types of the DOM. For example, the type HTMLInputElement extends HTMLElement and have the property value that the type HTMLElement doesn't have.
        const crafttype: string = (event.currentTarget.elements.namedItem(
            "crafts"
        ) as HTMLInputElement).value;

        const projectname: string = (event.currentTarget.elements.namedItem(
            "projectname"
        ) as HTMLInputElement).value;

        const patternused: string = (event.currentTarget.elements.namedItem(
            "patternused"
        ) as HTMLInputElement).value;
        const patternname: string = (event.currentTarget.elements.namedItem(
            "patternname"
        ) as HTMLInputElement).value;
        const newproject = new Project(
            crafttype,
            projectname,
            patternused,
            patternname
        );
        // create project on db
        // return obj of project info
        const newpath: string = "/notebook/editproject/" + projectname;
        navigate(newpath, {
            state: {
                craft: newproject.crafttype,
                name: newproject.projectname,
                pattern: newproject.pattern.name,
                aboutpattern: newproject.pattern.about,
            },
        });
    };

    return (
        <div>
            <form onSubmit={handlerSubmit}>
                <label htmlFor="craft-select">Which craft?</label>
                <select name="crafts" id="craft-select">
                    <option value="knitting">Knitting</option>
                    <option value="crochet">Crochet</option>
                    <option value="loomknitting">Loom Knitting</option>
                    <option value="machineknitting">Machine Knitting</option>
                    <option value="weaving">Weaving</option>
                    <option value="spinning">Spinning</option>
                </select>
                <label htmlFor="projectname">Name your project </label>
                <input type="text" id="projectname" name="projectname" />

                <input
                    type="radio"
                    id="usedapattern"
                    name="patternused"
                    value="usedapattern"
                    defaultChecked
                />
                <label htmlFor="usedapattern">I used a pattern</label>
                <label htmlFor="patternname">Enter the pattern name</label>
                <input type="text" id="patternname" name="patternname" />
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
