import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  refreshUserFailure,
  refreshUserStart,
  refreshUserSuccess,
  signInFailure,
  signInRequest,
  signInSuccess,
  signOut,
} from "./authSlice";
import { RootState } from "../store";

axios.defaults.baseURL = "http://localhost:3000/";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (
    credentials: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const res = await axios.post("/api/users/signup", credentials);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Sign-in failed";
        dispatch(signInFailure(errorMessage));
        return rejectWithValue(errorMessage);
      } else {
        const errorMessage = "Sign-in failed";
        dispatch(signInFailure(errorMessage));
        return rejectWithValue(errorMessage);
      }
    }
  }
);
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (
    credentials: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(signInRequest());

      const res = await axios.post(`/api/users/signin`, credentials);
      const { token, email } = res.data;
      dispatch(signInSuccess({ token, email }));
      setAuthHeader(token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Sign-in failed";
        dispatch(signInFailure(errorMessage));
        return rejectWithValue(errorMessage);
      } else {
        const errorMessage = "Sign-in failed";
        dispatch(signInFailure(errorMessage));
        return rejectWithValue(errorMessage);
      }
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axios.get("/api/users/logout");
      dispatch(signOut());
      clearAuthHeader();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Sign-in failed";
        dispatch(signInFailure(errorMessage));
        return rejectWithValue(errorMessage);
      } else {
        const errorMessage = "Sign-in failed";
        dispatch(signInFailure(errorMessage));
        return rejectWithValue(errorMessage);
      }
    }
  }
);

export const refreshUser: AsyncThunk<any, void, { state: RootState }> =
  createAsyncThunk("auth/refresh", async (_, { dispatch, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken) {
      setAuthHeader(persistedToken);
      dispatch(refreshUserStart());
      try {
        const res = await axios.get("/api/users/current");
        dispatch(refreshUserSuccess(res.data));
      } catch (error) {
        dispatch(refreshUserFailure());
      }
    } else {
      dispatch(refreshUserFailure());
    }
  });
