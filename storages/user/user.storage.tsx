import { USER_KEY } from 'constants/storage.constant';
import { User } from 'models/user/user.model';

const retrieveUserStorage = () => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return {} as User;
  }

  return JSON.parse(user) as User;
};

const insertUserStorage = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const removeUserStorage = () => {
  localStorage.removeItem(USER_KEY);
};

const userStorage = {
  retrieveUserStorage,
  insertUserStorage,
  removeUserStorage,
};

export default userStorage;
