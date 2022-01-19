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
            const {
                projectid,
                imageUrl,
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
            if (state.length === 1 && state[0].projectid === "") {
                state[0].projectid = projectid;
                state[0].crafttype = crafttype;
                state[0].projectname = projectname;
                state[0].patternused = patternused;
                state[0].pattern.name = patternname;
                state[0].pattern.about = about;
                state[0].projectinfo.madefor = madefor;
                state[0].projectinfo.linktoraveler = linktoraveler;
                state[0].projectinfo.finishby = finishby;
                state[0].projectinfo.sizemade = sizemade;
                state[0].projectinfo.patternfrom = patternfrom;
                state[0].projectinfo.patterncategory = patterncategory;
                state[0].projectinfo.selectedtags = selectedtags;
                state[0].projectinfo.needles = needles;
                state[0].projectinfo.hooks = hooks;
                state[0].projectinfo.gauge.numberStsOrRepeats = numberStsOrRepeats;
                state[0].projectinfo.gauge.horizontalunits = horizontalunits;
                state[0].projectinfo.gauge.numberRows = numberRows;
                state[0].projectinfo.gauge.gaugesize = gaugesize;
                state[0].projectinfo.gauge.gaugepattern = gaugepattern;
                state[0].projectinfo.yarn = yarn;
                state[0].projectinfo.projectnotes = projectnotes;
                state[0].projectstatus.progressstatus = progressstatus;
                state[0].projectstatus.progressrange = progressrange;
                state[0].projectstatus.happiness = happiness;
                state[0].projectstatus.starteddate = starteddate;
                state[0].projectstatus.completeddate = completeddate;
            } else {
                const project = {
                    projectid: projectid,
                    imageUrl: imageUrl,
                    crafttype: crafttype,
                    projectname: projectname,
                    patternused: patternused,
                    pattern: { name: patternname, about: about },
                    projectinfo: {
                        madefor: madefor,
                        linktoraveler: linktoraveler,
                        finishby: finishby,
                        sizemade: sizemade,
                        patternfrom: patternfrom,
                        patterncategory: patterncategory,
                        selectedtags: selectedtags,
                        needles: needles,
                        hooks: hooks,
                        gauge: {
                            numberStsOrRepeats: numberStsOrRepeats,
                            horizontalunits: horizontalunits,
                            numberRows: numberRows,
                            gaugesize: gaugesize,
                            gaugepattern: gaugepattern,
                        },
                        yarn: yarn,
                        projectnotes: projectnotes,
                    },
                    projectstatus: {
                        progressstatus: progressstatus,
                        progressrange: progressrange,
                        happiness: happiness,
                        starteddate: starteddate,
                        completeddate: completeddate,
                    },
                };
                state.push(project);
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
                existingProject.projectinfo.gauge.numberStsOrRepeats =
                    numberStsOrRepeats;
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
