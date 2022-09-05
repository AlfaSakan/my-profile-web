import { PARTICIPANT_KEY } from 'constants/storage.constant';
import { Participant } from 'models/participant/participant.model';

const insertListParticipants = (participants: Participant[]) => {
  localStorage.setItem(PARTICIPANT_KEY, JSON.stringify(participants));
};

const insertParticipant = (participant: Participant) => {
  const participants = retrieveParticipants();

  let isExisted = false;

  for (const part of participants) {
    isExisted = part.user_id === participant.user_id;
  }

  if (isExisted) return;

  insertListParticipants(participants);
};

const retrieveParticipants = () => {
  const participants = localStorage.getItem(PARTICIPANT_KEY);

  if (!participants) return {} as Participant[];

  return JSON.parse(participants) as Participant[];
};

const removeParticipants = () => localStorage.removeItem(PARTICIPANT_KEY);

const addFriend = (participant: Participant) => {
  const participants = retrieveParticipants();

  for (const part of participants) {
    if (part.user_id === participant.user_id) {
      part.isFriend = true;
    }
  }

  insertListParticipants(participants);
};

const participantStorage = {
  retrieveParticipants,
  insertListParticipants,
  insertParticipant,
  removeParticipants,
  addFriend,
};

export default participantStorage;
