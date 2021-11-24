// create new project
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import EditProject from "./EditProject.js";

// this function doesn't need an argument, not sure how to make a type for it
const NewProject = function () {
  let navigate = useNavigate();
  class Project {
    constructor(crafttype, projectname, patternused, patternname) {
      this.crafttype = crafttype;
      this.projectname = projectname;
      if (patternused === "usedapattern") {
        this.patternname = { name: patternname, about: "" }; //about should look for a pattern in db
      } else if (patternused === "didntuseapattern") {
        this.patternname = { name: "", about: "Improvised" };
      } else {
        this.patternname = {
          name: "",
          about: "Personal pattern (not in Ravelry)",
        };
      }
      this.projectinfo = {
        madefor: "",
        linktoraveler: "",
        finishby: "", //type date
        sizemade: "",
        patternform: "",
        patterncategory: "", //select
        tags: "", // separate tags and add # // select can be more than one
        needles: [],
        gauge: {
          numberStsOrRepeats: "",
          stitches: true,
          repeats: false,
          numberRows: "",
          gaugesize: "",
        }, // select. gauge size must be 2.5/5/10cm
        gaugepattern: "", //yarn, needles and private notes gets added afterwards
        yarn: [],
        projectnotes: "",
        photo: "", //image src
        status: "In progress", // change status with select
        happiness: "",
        progress: "",
        started: "", //date
        completed: "", //date}
      };
    }
  }

  // need to save to redux store and db
  const handlerSubmit = async function (event) {
    event.preventDefault();
    const crafttype = event.target.elements["crafts"].value;
    const projectname = event.target.elements["projectname"].value;
    const patternused = event.target.elements["patternused"].value;
    const patternname = event.target.elements["patternname"].value;
    const newproject = await new Project(
      crafttype,
      projectname,
      patternused,
      patternname
    );
    // create project on db
    // return obj of project info
    const newpath = "/notebook/editproject/" + projectname;
    navigate(newpath, {
      state: {
        craft: newproject.crafttype,
        name: newproject.projectname,
        pattern: newproject.patternname.name,
        aboutpattern: newproject.patternname.about,
      },
    });
    return newproject;
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
      {/* <Routes> */}
      {/*   <Route path=":newProjectName" element={<EditProject />} /> */}
      {/* </Routes> */}
    </div>
  );
};

export default NewProject;

// project details can be added after. this creates a project with a name
