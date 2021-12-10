import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const initialState = [
    {
        projectid: "",
        photo: "",
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
            tags: [],
            needles: [],
            hooks: [],
            gauge: {
                numberStsOrRepeats: "",
                stitches: true,
                numberRows: null,
                gaugesize: "",
            },
            gaugepattern: "",
            yarn: [],
            projectnotes: "",
        },
        projectstatus: {
            status: "In progress",
            progressrange: 0,
            happiness: "",
            startdate: "",
            completeddate: "",
        },
    },
];

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        projectAdded(state, action) {
            state.push(action.payload);
        },
        // incomplete for now
        projectUpdated(state, action) {
            const { projectid, projectname, pattern } = action.payload;
            const existingProject = state.find(
                (project) => project.projectid === projectid
            );
            if (existingProject) {
                existingProject.projectname = projectname;
                existingProject.pattern = pattern;
            }
        },
    },
});

export const { projectAdded, projectUpdated } = projectsSlice.actions;
export const selectProjectById = (state: RootState, projectID: string) =>
    state.projects.find((project) => project.projectid === projectID);
export default projectsSlice.reducer;
