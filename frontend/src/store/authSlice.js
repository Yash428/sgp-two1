import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    data: null,
    accessToken: null,
    role: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { 
        login: (state,action)=>{
            state.status  = true;
            state.data = action.payload;
            state.accessToken = action.payload.accessToken
            state.role = action.payload.role
        },
        logout: (state, action) =>{
            state.status = false;
            state.data = null;
            state.accessToken = null;
            state.role = null
        }

    }
})



export const {login, logout} = authSlice.actions;

export default authSlice.reducer