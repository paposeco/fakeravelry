import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../projects/projectsSlice";

export default configureStore({
  reducer: {
    projects: projectsReducer,
  },
});
