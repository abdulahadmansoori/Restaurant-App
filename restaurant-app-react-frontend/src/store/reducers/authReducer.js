import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dummyJson from "../../api/dummyJson";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";

export const signinUser = createAsyncThunk(
  "user/signin",
  async ({ name, password }) => {
    const result = await axios.post(`http://localhost:8000/users/signin/`, { name, password });
    // const result = await dummyJson.post("auth/login", {
    // //   // username: "kminchelle",
    // //   // password: "0lelplR",
    //   name,
    //   password,
    // });
    console.log(result.data.token);
    return result.data.token;
  }
);

export const createUser = createAsyncThunk(
  "user/create",

  async (values) => {
    return await axios.post('http://localhost:8000/users/add-user', values);
    // return await dummyJson.post("auth/signup", {
    //   username,
    //   email,
    //   password,
    // });
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => { });

export const checkIsUserAuthenticated = createAsyncThunk("user/isAuthenticated", async () => { });

const initialState = {
  isAuthenticated: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOutUser: (state) => initialState,
  },
  extraReducers: ({ addCase }) => {
    // Login User
    addCase(signinUser.pending, (state, action) => {
      state.isLoading = true;
    });
    addCase(signinUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      // document.cookie = `token=${action.payload}; path=/; secure; SameSite=Lax`;
    });
    addCase(signinUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    });

    // Create User
    addCase(createUser.pending, (state, action) => {
      state.isLoading = true;
    });
    addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    });
    addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Logout User
    addCase(logoutUser.pending, (state, action) => {
      state.isLoading = true;
    });
    addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    });
    addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Check Is User Authenticated
    addCase(checkIsUserAuthenticated.pending, (state, action) => {
      state.isLoading = true;
    });
    addCase(checkIsUserAuthenticated.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    });
    addCase(checkIsUserAuthenticated.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
export const { signOutUser } = authSlice.actions;
