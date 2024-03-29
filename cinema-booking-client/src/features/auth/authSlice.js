import authService from './services/authService';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('user');
const user = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt = localStorage.getItem('jwt');
const jwt = !!storedJwt ? JSON.parse(storedJwt) : null;

const initialState = {
  user: user,
  jwt: jwt,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to register.');
    }
  }
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to login.');
    }
  }
);

export const changePassword = createAsyncThunk('auth/change-password', async (user, thunkAPI) => {
  try {
    await authService.changePassword(user);
    authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to change password.')
  }
});

export const resetPassword = createAsyncThunk('auth/reset-password', async (email, thunkAPI) => {
  try {
    await authService.resetPassword(email);
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to reset password.')
  }
});

export const updateUserProfile = createAsyncThunk('/auth/update-profile', async (newUserData, thunkAPI) => {
  try {
    const res = await authService.updateUserProfile(newUserData);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to update profile information.')
  }
})

export const verifyEmail = createAsyncThunk('auth/verify-email', async (dispatchObject, thunkAPI) => {
  try {
    await authService.verifyEmail(dispatchObject.activationCode, dispatchObject.email);
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to verify email.');
  }
});

export const verifyJwt = createAsyncThunk('auth/verify-jwt', async (jwt, thunkAPI) => {
    try {
      return await authService.verifyJwt(jwt);
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to verify');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jwt = action.payload.jwt;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
      })
      // UPDATE USER PROFILE
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      // CHANGE PASSWORD
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.jwt = null;
        state.isAuthenticated = false;
      })
      .addCase(changePassword.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.isAuthenticated = false;
        state.isError = false;
      })
      // VERIFY JWT
      .addCase(verifyJwt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyJwt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload;
      })
      .addCase(verifyJwt.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
      })
      // VERIFY EMAIL
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload;
      })
      .addCase(verifyEmail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
      });
  },
});

export const { reset } = authSlice.actions;

export const selectedUser = (state) => {
  return state.auth;
};

export default authSlice.reducer;
