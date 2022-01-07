import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface UserInfo {
    username: string;
    name: string;
    userID: string;
}

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
