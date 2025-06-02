import {createSlice} from "@reduxjs/toolkit";
import {login, register} from "@/redux/thunks/usersThunk";
import {GlobalError, IUser} from "../../../types/usersTypes";

interface UsersState {
    user: IUser | null;
    loginLoading: boolean,
    registerLoading: boolean,
    registerError: GlobalError | null,
    loginError: GlobalError | null,
}

const initialState: UsersState = {
    user: null,
    loginLoading: false,
    loginError: null,
    registerLoading: false,
    registerError: null,
}

const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        logout: (state)=> {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.registerError = null;
            state.registerLoading = true;
        });
        builder.addCase(register.fulfilled, (state, {payload: user}) => {
            state.user = user;
            state.registerLoading = false;
        });
        builder.addCase(register.rejected, (state, {payload: error}) => {
            state.registerError = error || null;
            state.registerLoading = false;
        });

        builder.addCase(login.pending, (state) => {
            state.registerError = null;
            state.loginLoading = true;
        });
        builder.addCase(login.fulfilled, (state, {payload: user}) => {
            state.user = user;
            state.loginLoading = false;
        });
        builder.addCase(login.rejected, (state, {payload: error}) => {
            state.loginError = error || null;
            state.loginLoading = false;
        });
    }
});

export const usersReducer = UsersSlice.reducer;
export const { logout } = UsersSlice.actions;