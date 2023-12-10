import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoggedIn : false,
    userData : null
}
const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        login : (state , action) => {
            state.isLoggedIn = true,
            state.userData = action.payload 
        },
        logout : (state , action) => {
            state.isLoggedIn = false,
            state.userData = action.payload
        }
    }
})
export const {login , logout} = userSlice.actions;
export default userSlice.reducer;