import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light'
}

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        toLight:(state,action)=>{
            state.theme = 'light'
        },
        toDark:(state,action)=>{
            state.theme = 'dark'
        }
    }
})

export const {toDark,toLight} = themeSlice.actions
export default themeSlice.reducer