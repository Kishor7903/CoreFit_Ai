import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    userData: null,
    state: "",
    userTodo: [],
    user: null
}

export const registerUser = createAsyncThunk('/auth/register', async(userData) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`,
        userData,
        { withCredentials: true }
    )
    return response.data;
})

export const loginUser = createAsyncThunk('/auth/login', async (userData) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,
        userData,
        { withCredentials: true}
    )
    return response.data;
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateData: (state, actions) => {
            state.userData = actions.payload;
        },
        setState: (state, actions) => {
            state.state = actions.payload;
        },
        setUserTodo: (state, action) =>{
            state.userTodo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isAuthenticated = true,
            console.log(action?.payload?.data);
            // state.user = action.payload.user;
        })
    }
})

export const {updateData, setState} = authSlice.actions;
export default authSlice.reducer;
