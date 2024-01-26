import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: null
}

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: { 
        login: (state,action)=>{
            console.log(action.payload);
            state.role = action.payload
        },
        logout: (state, action) =>{
            state.role=null
        }
    }
})


export const {login, logout} = roleSlice.actions;

export default roleSlice.reducer