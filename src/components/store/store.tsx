import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../projects/projectsSlice";
import userReducer from "./userInfoSlice";
import otherUserReducer from "./otherUserInfoSlice";
import otherUserProjectsReducer from "../projects/projectsSliceOtherUser";

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        userinfo: userReducer,
        otheruserinfo: otherUserReducer,
        otheruserprojects: otherUserProjectsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
