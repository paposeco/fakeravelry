import { createSlice } from "@reduxjs/toolkit";

interface UserInfo {
    username: string;
    name: string;
    userID: string;
}

const initialState: UserInfo[] = [
    {
        username: "",
        name: "",
        userID: "",
    },
];

const userInfoSlice = createSlice({
    name: "userinfo",
    initialState,
    reducers: {
        userAdded(state, action) {
            const { username, name, userID } = action.payload;
            state[0].username = username;
            state[0].name = name;
            state[0].userID = userID;
            state.push(action.payload);
        },
    },
});

export const { userAdded } = userInfoSlice.actions;
export default userInfoSlice.reducer;

// there's something going on with the user added.
