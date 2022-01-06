import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../projects/projectsSlice";
import userReducer from "./userInfoSlice";

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        userinfo: userReducer,
    },
});

// type of state in redux. could have used rootstateorany
export type RootState = ReturnType<typeof store.getState>;
