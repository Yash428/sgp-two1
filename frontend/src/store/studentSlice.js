import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentData: null
}

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: { 
        storeStudent: (state,action)=>{
            state.studentData = action.payload;
        }
    }
})



export const {storeStudent} = studentSlice.actions;

export default studentSlice.reducer