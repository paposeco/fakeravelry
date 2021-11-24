import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    crafttype: "",
    projectname: "",
    patternused: "",
    pattern: { name: "", about: "" },
  },
];

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
});

export default projectsSlice.reducer;
