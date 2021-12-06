import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
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
      gauge: {
        numberStsOrRepeats: "",
        stitches: true,
        numberRows: null,
        gaugesize: "",
      },
      gaugepattern: "",
      yarn: [],
      projectnotes: "",
      photo: "",
      status: "In progress",
      happiness: "",
      progress: 0,
      started: "",
      completed: "",
    },
  },
];

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
});

export default projectsSlice.reducer;
