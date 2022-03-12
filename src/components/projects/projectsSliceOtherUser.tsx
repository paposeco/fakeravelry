import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        projectid: "",
        imageUrl: "",
        crafttype: "",
        projectslug: "",
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
                numberStsOrRepeats: 0,
                horizontalunits: "stitches",
                numberRows: 0,
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

const projectsSliceOtherUser = createSlice({
    name: "otheruserprojects",
    initialState,
    reducers: {
        clearProjects(state, action) {
            return initialState;
        },
        otherUserProjectFetchedFromDB(state, action) {
            const {
                projectid,
                imageUrl,
                crafttype,
                projectslug,
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
                state[0].imageUrl = imageUrl;
                state[0].crafttype = crafttype;
                state[0].projectslug = projectslug;
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
                    projectslug: projectslug,
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
    },
});

export const {
    otherUserProjectFetchedFromDB,
    clearProjects,
} = projectsSliceOtherUser.actions;
export default projectsSliceOtherUser.reducer;
