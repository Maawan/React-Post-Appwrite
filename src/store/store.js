import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./loadingSlice";
import userSlice from "./userSlice";
const store = configureStore({
    reducer : {
        loading : loadingSlice,
        user : userSlice
    }
})
export default store;