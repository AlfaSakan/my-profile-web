import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PARTICIPANT_KEY } from 'constants/storage.constant';
import { User } from 'models/user/user.model';

export interface ParticipantStore extends User {}

export const participantStoreInitialStore: ParticipantStore[] = [];

const participantSlice = createSlice({
  name: 'list participant',
  initialState: participantStoreInitialStore,
  reducers: {
    insertParticipant: (state, action: PayloadAction<ParticipantStore[]>) => {
      const participantIdsStore = state.map((part) => part.user_id);

      const users = action.payload.filter(
        (part) => !participantIdsStore.includes(part.user_id)
      );

      const newState = [...state, ...users];

      localStorage.setItem(PARTICIPANT_KEY, JSON.stringify(newState));

      return newState;
    },

    getParticipantStorage: (state) => {
      const participantString = localStorage.getItem(PARTICIPANT_KEY);

      if (!participantString) return state;

      const participantsArray = JSON.parse(
        participantString
      ) as ParticipantStore[];

      return [...state, ...participantsArray];
    },

    deleteParticipant: () => {
      localStorage.removeItem(PARTICIPANT_KEY);

      return [];
    },
  },
});

export const { insertParticipant, getParticipantStorage, deleteParticipant } =
  participantSlice.actions;
export default participantSlice.reducer;
