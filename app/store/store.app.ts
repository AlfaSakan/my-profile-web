import { configureStore } from '@reduxjs/toolkit';
import {
  chatRoomReducer,
  messageReducer,
  participantReducer,
  sessionReducer,
  userReducer,
} from 'stores';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    user: userReducer,
    chatRoom: chatRoomReducer,
    message: messageReducer,
    participant: participantReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
