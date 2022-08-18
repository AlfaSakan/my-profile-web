import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_KEY } from 'constants/storage.constant';
import { User } from 'models/user/user.model';

export interface UserStore extends User {}

export const userStoreInitialState: UserStore = {
  country_code: '',
  created_at: 0,
  image_url: '',
  name: '',
  phone_number: '',
  status: '',
  updated_at: 0,
  user_id: 0,
};

const userSlice = createSlice({
  name: 'user store',
  initialState: userStoreInitialState,
  reducers: {
    getUser: (state, action: PayloadAction<UserStore>) => {
      localStorage.setItem(USER_KEY, JSON.stringify(action.payload));

      return {
        ...state,
        ...action.payload,
      };
    },
    patchUser: (state, action: PayloadAction<Partial<UserStore>>) => {
      const user = localStorage.getItem(USER_KEY) as string;
      const userObject = JSON.parse(user) as User;

      localStorage.setItem(
        USER_KEY,
        JSON.stringify({ ...userObject, ...action.payload })
      );

      return {
        ...state,
        ...action.payload,
      };
    },
    deleteUser: (state) => {
      localStorage.removeItem(USER_KEY);

      return {
        ...state,
        ...userStoreInitialState,
      };
    },
  },
});

export const { deleteUser, getUser, patchUser } = userSlice.actions;
export default userSlice.reducer;
