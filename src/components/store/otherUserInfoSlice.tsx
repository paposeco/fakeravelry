import { createSlice } from "@reduxjs/toolkit";

interface OtherUserInfo {
    username: string;
    name: string;
    userID: string;
}

const initialState: OtherUserInfo = {
    username: "",
    name: "",
    userID: "",
};
const otherUserInfoSlice = createSlice({
    name: "otheruserinfo",
    initialState,
    reducers: {
        otherUserAdded(state, action) {
            const { username, name, userID } = action.payload;
            state.username = username;
            state.name = name;
            state.userID = userID;
        },
    },
});

export const { otherUserAdded } = otherUserInfoSlice.actions;
export default otherUserInfoSlice.reducer;
