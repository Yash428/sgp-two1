import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    studentData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { 
        login: (state,action)=>{
            state.status  = true;
            state.studentData = action.payload;
        },
        logout: (state, action) =>{
            state.status = false;
            state.studentData = null;
        }

    }
})



export const {login, logout} = authSlice.actions;

export default authSlice.reducer