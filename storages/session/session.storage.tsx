import { SESSION_KEY } from 'constants/storage.constant';
import { Session } from 'models/session/session.model';

const retrieveSessionStorage = () => {
  if (typeof window === 'undefined') {
    return {} as Session;
  }

  const session = localStorage.getItem(SESSION_KEY);

  if (!session) return {} as Session;

  return JSON.parse(session) as Session;
};

const insertSessionStorage = (session: Session) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

const removeSessionStorage = () => localStorage.removeItem(SESSION_KEY);

const sessionStorage = {
  retrieveSessionStorage,
  insertSessionStorage,
  removeSessionStorage,
};

export default sessionStorage;
