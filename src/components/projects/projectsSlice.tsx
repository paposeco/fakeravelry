import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const initialState = [
    {
        projectid: "",
        imageUrl: "",
        crafttype: "",
        projectname: "",
        patternused: "",
        pattern: { name: "", about: "" },
        projectinfo: {
            madefor: "",
            linktoraveler: "",
            finishby: "",
            sizemade: "",
            patternfrom: "",
            patterncategory: "",
            selectedtags: "",
            needles: [],
            hooks: [],
            gauge: {
                numberStsOrRepeats: null,
                horizontalunits: "stitches",
                numberRows: null,
                gaugesize: "",
                gaugepattern: "",
            },
            yarn: [],
            projectnotes: "",
        },
        projectstatus: {
            progressstatus: "In progress",
            progressrange: "0",
            happiness: "",
            starteddate: "",
            completeddate: "",
        },
    },
];

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        projectAdded(state, action) {
            if (state.length === 1 && state[0].projectid === "") {
                state[0].projectid = action.payload.projectid;
            } else {
                let initialstateCopy = Object.assign({}, initialState[0]);
                initialstateCopy.projectid = action.payload.projectid;
                state.push(initialstateCopy);
            }
        },
        projectPhotoAdded(state, action) {
            const { projectid, imageUrl } = action.payload;
            const existingProject = state.find(
                (project) => project.projectid === projectid
            );
            if (existingProject) {
                existingProject.imageUrl = imageUrl;
            }
        },
        projectUpdated(state, action) {
            const {
                projectid,
                crafttype,
                projectname,
                patternused,
                patternname,
                about,
                madefor,
                linktoraveler,
                finishby,
                sizemade,
                patternfrom,
                patterncategory,
                selectedtags,
                needles,
                hooks,
                numberStsOrRepeats,
                horizontalunits,
                numberRows,
                gaugesize,
                gaugepattern,
                yarn,
                projectnotes,
                progressstatus,
                progressrange,
                happiness,
                starteddate,
                completeddate,
            } = action.payload;
            const existingProject = state.find(
                (project) => project.projectid === projectid
            );
            if (existingProject) {
                existingProject.crafttype = crafttype;
                existingProject.projectname = projectname;
                existingProject.patternused = patternused;
                existingProject.pattern.name = patternname;
                existingProject.pattern.about = about;
                existingProject.projectinfo.madefor = madefor;
                existingProject.projectinfo.linktoraveler = linktoraveler;
                existingProject.projectinfo.finishby = finishby;
                existingProject.projectinfo.sizemade = sizemade;
                existingProject.projectinfo.patternfrom = patternfrom;
                existingProject.projectinfo.patterncategory = patterncategory;
                existingProject.projectinfo.selectedtags = selectedtags;
                existingProject.projectinfo.needles = needles;
                existingProject.projectinfo.hooks = hooks;
                existingProject.projectinfo.gauge.numberStsOrRepeats = numberStsOrRepeats;
                existingProject.projectinfo.gauge.horizontalunits = horizontalunits;
                existingProject.projectinfo.gauge.numberRows = numberRows;
                existingProject.projectinfo.gauge.gaugesize = gaugesize;
                existingProject.projectinfo.gauge.gaugepattern = gaugepattern;
                existingProject.projectinfo.yarn = yarn;
                existingProject.projectinfo.projectnotes = projectnotes;
                existingProject.projectstatus.progressstatus = progressstatus;
                existingProject.projectstatus.progressrange = progressrange;
                existingProject.projectstatus.happiness = happiness;
                existingProject.projectstatus.starteddate = starteddate;
                existingProject.projectstatus.completeddate = completeddate;
            }
        },
    },
});

export const {
    projectAdded,
    projectUpdated,
    projectPhotoAdded,
} = projectsSlice.actions;
export const selectProjectById = (state: RootState, projectID: string) =>
    state.projects.find((project) => project.projectid === projectID);
export default projectsSlice.reducer;
