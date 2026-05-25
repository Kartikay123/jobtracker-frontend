import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { clearAuthState } from '@/lib/storage';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authApi.login(credentials);
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || 'Login failed');
    }
  },
);

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.signup(payload);
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || 'Signup failed');
    }
  },
);

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      clearAuthState();
    },
  },
  extraReducers: (b) => {
    b.addCase(loginThunk.pending, (s) => {
      s.status = 'loading';
      s.error = null;
    });
    b.addCase(loginThunk.fulfilled, (s, a) => {
      s.status = 'succeeded';
      s.user = a.payload.user;
      s.token = a.payload.accessToken;
    });
    b.addCase(loginThunk.rejected, (s, a) => {
      s.status = 'failed';
      s.error = a.payload;
    });
    b.addCase(signupThunk.pending, (s) => {
      s.status = 'loading';
      s.error = null;
    });
    b.addCase(signupThunk.fulfilled, (s, a) => {
      s.status = 'succeeded';
      s.user = a.payload.user;
      s.token = a.payload.accessToken;
    });
    b.addCase(signupThunk.rejected, (s, a) => {
      s.status = 'failed';
      s.error = a.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (s) => s.auth;
export const selectIsAuthenticated = (s) => Boolean(s.auth.token);
export const selectCurrentUser = (s) => s.auth.user;
export default authSlice.reducer;
