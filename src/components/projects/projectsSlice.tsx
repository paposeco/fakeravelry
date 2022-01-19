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
                numberStsOrRepeats: undefined,
                horizontalunits: "stitches",
                numberRows: undefined,
                gaugesize: "",
                gaugepattern: "",
            },
            yarn: "",
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
                state[0].crafttype = action.payload.crafttype;
                state[0].projectname = action.payload.projectname;
                state[0].patternused = action.payload.patternused;
                state[0].pattern.name = action.payload.patternname;
            } else {
                let initialstateCopy = Object.assign({}, initialState[0]);
                initialstateCopy.projectid = action.payload.projectid;
                initialstateCopy.crafttype = action.payload.crafttype;
                initialstateCopy.projectname = action.payload.projectname;
                initialstateCopy.patternused = action.payload.patternused;
                initialstateCopy.pattern.name = action.payload.patternname;
                state.push(initialstateCopy);
            }
        },
        projectFetchedFromDB(state, action) {
            let initialstateCopy = Object.assign({}, initialState[0]);
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
            initialstateCopy.projectid = projectid;
            initialstateCopy.crafttype = crafttype;
            initialstateCopy.projectname = projectname;
            initialstateCopy.patternused = patternused;
            initialstateCopy.pattern.name = patternname;
            initialstateCopy.pattern.about = about;
            initialstateCopy.projectinfo.madefor = madefor;
            initialstateCopy.projectinfo.linktoraveler = linktoraveler;
            initialstateCopy.projectinfo.finishby = finishby;
            initialstateCopy.projectinfo.sizemade = sizemade;
            initialstateCopy.projectinfo.patternfrom = patternfrom;
            initialstateCopy.projectinfo.patterncategory = patterncategory;
            initialstateCopy.projectinfo.selectedtags = selectedtags;
            initialstateCopy.projectinfo.needles = needles;
            initialstateCopy.projectinfo.hooks = hooks;
            initialstateCopy.projectinfo.gauge.numberStsOrRepeats = numberStsOrRepeats;
            initialstateCopy.projectinfo.gauge.horizontalunits = horizontalunits;
            initialstateCopy.projectinfo.gauge.numberRows = numberRows;
            initialstateCopy.projectinfo.gauge.gaugesize = gaugesize;
            initialstateCopy.projectinfo.gauge.gaugepattern = gaugepattern;
            initialstateCopy.projectinfo.yarn = yarn;
            initialstateCopy.projectinfo.projectnotes = projectnotes;
            initialstateCopy.projectstatus.progressstatus = progressstatus;
            initialstateCopy.projectstatus.progressrange = progressrange;
            initialstateCopy.projectstatus.happiness = happiness;
            initialstateCopy.projectstatus.starteddate = starteddate;
            initialstateCopy.projectstatus.completeddate = completeddate;
            state.push(initialstateCopy);
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
    projectFetchedFromDB,
    projectUpdated,
    projectPhotoAdded,
} = projectsSlice.actions;
export const selectProjectById = (state: RootState, projectID: string) =>
    state.projects.find((project) => project.projectid === projectID);
export default projectsSlice.reducer;
