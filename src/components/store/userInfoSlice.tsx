import { createSlice } from "@reduxjs/toolkit";
import type { UserInfo } from "../common/types";

const initialState: UserInfo = {
    username: "",
    name: "",
    userID: "",
};
const userInfoSlice = createSlice({
    name: "userinfo",
    initialState,
    reducers: {
        userAdded(state, action) {
            const { username, name, userID } = action.payload;
            state.username = username;
            state.name = name;
            state.userID = userID;
        },
    },
});

export const { userAdded } = userInfoSlice.actions;
export default userInfoSlice.reducer;
