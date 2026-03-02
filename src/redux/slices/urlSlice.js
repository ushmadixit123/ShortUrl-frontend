import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js";

// ✅ Create Short URL
export const createURL = createAsyncThunk(
    "url/createURL",
    async (data, thunkAPI) => {
        try {
            const response = await api.post("url/shorten", {longUrl : data});
            return response.data; // Always return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data || "Something went wrong"
            );
        }
    }
);

// create QR code 
export const createQR = createAsyncThunk(
    "url/createOR",
    async (data, thunkAPI) => {
        try {
            const response = await api.post("url/shorten", {longUrl : data});
            return response.data; // Always return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data || "Something went wrong"
            );
        }
    }
);

// ✅ Get All URLs (for dashboard)
export const getUserURLs = createAsyncThunk(
    "url/getUserURLs",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/url/getUserUrls");
            console.log("response",response)
            return response.data.urls;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data || "Failed to fetch URLs"
            );
        }
    }
);

// ✅ Delete URL
export const deleteURL = createAsyncThunk(
    "url/deleteURL",
    async (id, thunkAPI) => {
        try {
            await api.delete(`/url/deleteUrl/${id}`);
            return id; // return id to remove from state
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data || "Failed to delete"
            );
        }
    }
);

const urlSlice = createSlice({
    name: "url",
    initialState: {
        urls: [],
        shortUrl: null,
        QR:null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearURLState: (state) => {
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder

            // 🔹 CREATE URL
            .addCase(createURL.pending, (state) => {
                state.loading = true;
            })
            .addCase(createURL.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.shortUrl = action.payload.shortUrl; // add new URL on top
            })
            .addCase(createURL.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 CREATE QR
            .addCase(createQR.pending, (state) => {
                state.loading = true;
            })
            .addCase(createQR.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.QR = action.payload.shortUrl; // add new URL on top
            })
            .addCase(createQR.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // 🔹 GET URLS
            .addCase(getUserURLs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserURLs.fulfilled, (state, action) => {
                state.loading = false;
                state.urls = action.payload;
            })
            .addCase(getUserURLs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 🔹 DELETE URL
            .addCase(deleteURL.fulfilled, (state, action) => {
                state.urls = state.urls.filter(
                    (url) => url._id !== action.payload
                );
            });
    },
});

export const { clearURLState } = urlSlice.actions;
export default urlSlice.reducer;
