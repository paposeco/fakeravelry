import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../projects/projectsSlice";

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
    },
});

// type of state in redux. could have used rootstateorany
export type RootState = ReturnType<typeof store.getState>;
