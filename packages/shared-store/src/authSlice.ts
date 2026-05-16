import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AuthState, User } from './types';

interface LoginPayload {
  user: User;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: () => initialState,
  },
});

export const { actions, reducer } = authSlice;
export const { login, logout } = actions;
export const authReducer = reducer;
