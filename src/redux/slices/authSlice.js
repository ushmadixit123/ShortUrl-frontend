import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js";

// Async login action

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data, thunkAPI) => {
        try{
            const response = await api.post("/auth/login", data);
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const signupUser = createAsyncThunk(
    "/auth/signUser", 
    async (data , thunkAPI)=>{
        try{
        const response = await api.post("/auth/signup", data);
        return response;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        } 
    }
)

// Aysnc Signup action


const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        token : null,
        loading : null,
        error : null
    },
    reducers : {
        logout : (state) => {
            state.user = null;
            state. token = null;
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled , (state , action)=>{
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token)
            })
            .addCase(loginUser.rejected , (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signupUser.pending, (state)=> {
                state.loading = true;
            })
            .addCase(signupUser.fulfilled, (state , action)=>{
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token)
            })
            .addCase(signupUser.rejected, (state)=>{
                state.loading = false;
            })
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;

