import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatRoom } from 'models/chat_room/chatRoom.model';

export interface ChatRoomStore extends ChatRoom {}

export const chatRoomStoreInitialState: ChatRoomStore[] = [];

const chatRoomSlice = createSlice({
  name: 'chat room store',
  initialState: chatRoomStoreInitialState,
  reducers: {
    insertChatRoomsList: (state, action: PayloadAction<ChatRoomStore[]>) => {
      return [...state, ...action.payload];
    },
    insertChatRoom: (state, action: PayloadAction<ChatRoomStore>) => {
      const chatRooms = [...state, action.payload];

      return chatRooms;
    },
    updateChatRoom: (state, action: PayloadAction<Partial<ChatRoomStore>>) => {
      const updatedChatRooms = state.map((room) => {
        if (room.chat_room_id === action.payload?.chat_room_id) {
          return { ...room, ...action.payload };
        }
        return room;
      });

      return updatedChatRooms;
    },
    deleteChatRoom: () => {
      return [];
    },
  },
});

export const {
  deleteChatRoom,
  insertChatRoom,
  updateChatRoom,
  insertChatRoomsList,
} = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
