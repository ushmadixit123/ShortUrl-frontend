import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import urlReducer from "./slices/urlSlice";
import analyticsReducer from "./slices/analyticSlice";

export const store = configureStore({
    reducer : {
        auth : authReducer,
        url : urlReducer,
        analytics: analyticsReducer,
    },
})
