import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MESSAGE_KEY } from 'constants/storage.constant';
import { Message } from 'models/message/message.model';

export interface MessageStore extends Message {}

export const messageStoreInitialState: MessageStore[] = [];

const messageSlice = createSlice({
  name: 'message store',
  initialState: messageStoreInitialState,
  reducers: {
    retrieveMessages: (_, action: PayloadAction<MessageStore[]>) => {
      return [...action.payload];
    },

    insertMessage: (state, action: PayloadAction<MessageStore>) => {
      const messages = [...state, action.payload];

      localStorage.setItem(MESSAGE_KEY, JSON.stringify(messages));

      return messages;
    },

    deleteMessageStore: () => {
      localStorage.removeItem(MESSAGE_KEY);

      return [];
    },
  },
});

export const { insertMessage, retrieveMessages, deleteMessageStore } =
  messageSlice.actions;

export default messageSlice.reducer;
