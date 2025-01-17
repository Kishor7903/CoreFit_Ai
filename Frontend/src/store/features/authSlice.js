import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    userData: null
}

export const registerUser = createAsyncThunk('/auth/register', async(userData) => {
    const response = await axios.post("http://localhost:3000/api/auth/signup",
        userData,
        { withCredentials: true }
    )
    return response.data;
})

export const loginUser = createAsyncThunk('/auth/login', async (userData) => {
    const response = await axios.post("http://localhost:3000/api/auth/login",
        userData,
        { withCredentials: true}
    )
    return response.data;
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    }
})

export const {} = authSlice.actions;
export default authSlice.reducer;
