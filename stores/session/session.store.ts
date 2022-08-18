import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SESSION_KEY } from 'constants/storage.constant';
import { Session } from 'models/session/session.model';

export interface SessionStore extends Session {
  isLoggedIn: boolean;
}

export const sessionStoreInitialState: SessionStore = {
  access_token: '',
  refresh_token: '',
  session_id: 0,
  isLoggedIn: false,
};

const sessionSlice = createSlice({
  name: 'session store',
  initialState: sessionStoreInitialState,
  reducers: {
    login: (state, action: PayloadAction<SessionStore>) => {
      const sessionStorage = localStorage.getItem(SESSION_KEY);

      if (!sessionStorage) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(action.payload));
      }

      return {
        ...state,
        ...action.payload,
      };
    },
    logout: (state) => {
      localStorage.removeItem(SESSION_KEY);

      return {
        ...state,
        ...sessionStoreInitialState,
      };
    },
  },
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
