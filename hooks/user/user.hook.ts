/* eslint-disable react-hooks/exhaustive-deps */
import { User } from 'models/user/user.model';
import { useState } from 'react';
import { userService } from 'services';

const useUserHook = () => {
  const [user, setUser] = useState<User>({} as User);

  const { getUserService } = userService();

  const userRequest = async () => {
    try {
      const res = await getUserService();

      if (!res) return;

      setUser(res.data);
    } catch (error) {
      console.log('userRequest =>', error);
    }
  };

  return { user, setUser, userRequest };
};

export default useUserHook;
