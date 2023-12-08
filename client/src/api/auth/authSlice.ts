import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { email: string | null };
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isFetching: boolean;
  error: string | null;
}
const initialState: AuthState = {
  user: { email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isFetching: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInRequest: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    signInSuccess: (
      state,
      action: PayloadAction<{ token: string; email: string }>
    ) => {
      state.user = { email: action.payload.email };
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isFetching = false;
      state.error = null;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.user = { email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isFetching = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.user = { email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isFetching = false;
      state.error = null;
    },
    refreshUserStart: (state) => {
      state.isRefreshing = true;
    },
    refreshUserSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    refreshUserFailure: (state) => {
      state.isRefreshing = false;
    },
  },
});

// .addCase(register.fulfilled, (state, action) => {
//   state.user = action.payload.user;
//   state.token = action.payload.token;
//   state.isLoggedIn = true;
// })
// .addCase(logIn.fulfilled, (state, action) => {
//   state.user = action.payload.user;
//   state.token = action.payload.token;
//   state.isLoggedIn = true;
// })
// .addCase(logOut.fulfilled, (state) => {
//   state.user = { name: null, email: null };
//   state.token = null;
//   state.isLoggedIn = false;
// })
// .addCase(refreshUser.pending, (state) => {
//   state.isRefreshing = true;
// })
// .addCase(refreshUser.fulfilled, (state, action) => {
//   state.user = action.payload;
//   state.isLoggedIn = true;
//   state.isRefreshing = false;
// })
// .addCase(refreshUser.rejected, (state) => {
//   state.isRefreshing = false;
// });
export const {
  signInRequest,
  signInSuccess,
  signInFailure,
  signOut,
  refreshUserStart,
  refreshUserSuccess,
  refreshUserFailure,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
